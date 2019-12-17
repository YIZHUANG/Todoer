import AsyncStorage from '@react-native-community/async-storage';

import {SETTINGS, NOTIFICATIONS} from 'src/constants';
import todoModels from 'src/models';
import parseMultiTodos from 'utils/parseMultiTodos';
import monitor from 'modules/monitor';
import { CreateTodo } from 'src/types';

export async function addTodo(todo: CreateTodo) {
  try {
    const newTodo = todoModels.createTodo(todo);
    await AsyncStorage.setItem(newTodo.id, JSON.stringify(newTodo));
    return newTodo;
  } catch (e) {
    monitor.catchError(e);
  }
}

export async function getAllTodos() {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const allTodoItems = await AsyncStorage.multiGet(
      allKeys.filter(key => key !== SETTINGS && key !== NOTIFICATIONS),
    );
    return parseMultiTodos(allTodoItems);
  } catch (e) {
    monitor.catchError(e);
  }
}

export async function removeAllTodos() {
  const allKeys = await AsyncStorage.getAllKeys();
  try {
    await AsyncStorage.multiRemove(allKeys);
  } catch (e) {
    monitor.catchError(e);
  }
}

export async function editTodo(todo) {
  try {
    const editedToDoItem = todoModels.editTodo(todo);
    await AsyncStorage.mergeItem(todo.id, JSON.stringify(editedToDoItem));
    return editedToDoItem;
  } catch (e) {
    monitor.catchError(e);
  }
}

export async function editTodos(todosWithKeyValue) {
  try {
    await AsyncStorage.multiSet(todosWithKeyValue);
  } catch (e) {
    monitor.catchError(e);
  }
}

export async function removeTodos(selectedTodos) {
  try {
    const allIds = selectedTodos.map(todo => todo.id);
    await AsyncStorage.multiRemove(allIds);
  } catch (e) {
    monitor.catchError(e);
  }
}

export async function removeTodo(todo) {
  try {
    await AsyncStorage.removeItem(todo.id);
  } catch (e) {
    monitor.catchError(e);
  }
}
