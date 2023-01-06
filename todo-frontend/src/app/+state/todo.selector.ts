import {CoreState, TodoState} from './todo.reducer';
import { createSelector } from '@ngrx/store';

export const selectCoreState = (state: CoreState) => state.core;

export const selectTodos = createSelector(
  selectCoreState,
  (state: TodoState) => state.todos
);
