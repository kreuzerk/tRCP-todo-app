import { createReducer, on, Action } from '@ngrx/store';

import { Todo } from './todo.model';
import {deleteTodo, loadTodosSuccess, todoAddedSuccess, todoDeletedSuccess, todoUpdatedSuccess} from './todo.actions';

export interface CoreState {
  core: TodoState
}
export interface TodoState {
  todos: Todo[];
  error: any;
}

export const initialState: TodoState = {
todos: [],
  error: null,
};

export function todosStateReducer(state: TodoState | undefined, action: Action) {
  return createReducer(
    initialState,
    on(loadTodosSuccess, (state, { todos }) => {
      return {
        ...state,
        todos: todos,
      };
    }),
    on(todoAddedSuccess, (state, { todo }) => {
      return {
        ...state,
        todos: [...state.todos, todo]
      };
    }),
    on(todoDeletedSuccess, (state, { todo }) => {
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== todo.id)
      }
    }),
    on(todoUpdatedSuccess, (state, { todo }) => {
      return {
        ...state,
        todos: state.todos.map(t => t.id === todo.id ? todo : t)
      }
    })
  )(state, action);
}
