// todos: Figure out GDPR thingy and add error catching.

import AsyncStorage from '@react-native-community/async-storage';

import {SETTINGS} from '../constants';
import todoModels from '../models';
import parseMultiTodos from 'utils/parseMultiTodos';

export async function addTodo(todo) {
  const newTodo = todoModels.createTodo(todo);
  await AsyncStorage.setItem(id, JSON.stringify(newTodo));
  return newTodo;
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
    const editedToDoItem = todoModels.editTodo(todo);
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
