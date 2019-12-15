// todos: Figure out GDPR thingy and add error catching.

import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';

import {SETTINGS} from '../constants';
import parseMultiTodos from '../utils/parseMultiTodos';

export async function addTodo(data) {
  const id = uuidv4();
  const savedToDoItem = {
    id,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    ...data,
  };
  await AsyncStorage.setItem(id, JSON.stringify(savedToDoItem));
  return savedToDoItem;
}

export async function getAllTodos() {
  const allKeys = await AsyncStorage.getAllKeys();
  const allTodoItems = await AsyncStorage.multiGet(
    allKeys.filter(key => key !== SETTINGS),
  );
  return parseMultiTodos(allTodoItems);
}

export async function removeAllTodos() {
  const allKeys = await AsyncStorage.getAllKeys();
  try {
    await AsyncStorage.multiRemove(allKeys);
  } catch (e) {}
}
export async function editTodo(todo) {
  try {
    const editedToDoItem = {...todo, lastUpdated: new Date().toISOString()};
    await AsyncStorage.mergeItem(todo.id, JSON.stringify(editedToDoItem));
    return editedToDoItem;
  } catch (e) {}
}

export async function editTodos(todosWithKeyValue) {
  try {
    await AsyncStorage.multiSet(todosWithKeyValue);
  } catch (e) {}
}

export async function removeTodos(selectedTodos) {
  try {
    const allIds = selectedTodos.map(todo => todo.id);
    await AsyncStorage.multiRemove(allIds);
  } catch (e) {}
}

export async function removeTodo(todo) {
  try {
    await AsyncStorage.removeItem(todo.id);
  } catch (e) {}
}
