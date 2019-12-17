import rootReducer from './reducers';

export enum ModalTypes {
  ADD_TODO_MODAL = 'ADD_TODO_MODAL',
  EDIT_TODO_MODAL = 'EDIT_TODO_MODAL',
  REMIND_DROPDOWN_MODAL = 'REMIND_DROPDOWN_MODAL',
  DATE_PICKER = 'DATE_PICKER',
  TIME_PICKER = 'TIME_PICKER',
}
export enum RouteNames {
  Home = 'Home',
  Completed = 'Completed',
  Settings = 'Settings',
}
export enum TodoTypes {
  DUE = 'due',
  PAST = 'past',
  ONGOING = 'ongoing',
}
export enum RepeatTypes {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum LocaleTypes {
  ENGLISH = 'english',
  CHINESE = 'chinese',
}

export interface Notification {
  todoId: string;
  notificationId: number;
  remindIntervalInMinutes: number;
  text: string;
}
export type Notifications = Notification[];

export interface Settings {
  theme: 'Red';
  language: 'English';
  quickAddTodo: boolean;
}
export interface Todo {
  id: string;
  text: string;
  createdAt: string;
  lastUpdated?: string;
  done?: boolean;
  deadline?: string;
  completeDate?: string;
  repeat?: RepeatTypes;
  remindIntervalInMinutes?: number;
  remindEnabled?: boolean;
}
export type Todos = Todo[];
export type CreateTodo = Partial<Todo>;
export type TodoWithoutId = Exclude<Todo, 'id'>;

export interface AllTodos {
  [TodoTypes.ONGOING]: Todos;
  [TodoTypes.PAST]: Todos;
  [TodoTypes.DUE]: Todos;
}
export type ActiveTodos = Exclude<AllTodos, TodoTypes.PAST>;
export type PastTodos = Pick<AllTodos, TodoTypes.PAST>;

export type AppState = ReturnType<typeof rootReducer>;
