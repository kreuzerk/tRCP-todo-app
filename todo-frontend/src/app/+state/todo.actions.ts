import { createAction, props } from '@ngrx/store';

import {CreateAndUpdateTodo, Todo} from './todo.model';

export const init = createAction('[TODO] init');
export const addTodo = createAction('[TODO] add Todo', props<{ todo: CreateAndUpdateTodo }>());
export const deleteTodo = createAction('[TODO] delete Todo', props<{ id: number }>());
export const updateTodo = createAction('[TODO] update Todo', props<{ updatedTodo: Todo }>());

export const loadTodosSuccess = createAction(
  '[TODO] todos successfully loaded',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction(
  '[TODO] loading todos failed',
  props<{ error: any }>()
);

export const todoAddedSuccess = createAction(
  '[TODO] todo successfully added',
  props<{ todo: Todo }>()
);

export const todoAddedFailed = createAction(
  '[TODO] failed to add a new Todo',
  props<{ error: any }>()
);

export const todoDeletedSuccess = createAction(
  '[TODO] todo successfully deleted',
  props<{ todo: Todo }>()
);

export const todoDeletedFailed = createAction(
  '[TODO] failed to delete the Todo',
  props<{ error: any }>()
);

export const todoUpdatedSuccess = createAction(
  '[TODO] todo successfully updated',
  props<{ todo: Todo }>()
);

export const todoUpdatedFailed = createAction(
  '[TODO] failed to update the Todo',
  props<{ error: any }>()
);
