import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';

import {
  addTodo,
  deleteTodo,
  init,
  loadTodosFailed,
  loadTodosSuccess,
  todoAddedFailed,
  todoAddedSuccess,
  todoDeletedFailed,
  todoDeletedSuccess, todoUpdatedFailed, todoUpdatedSuccess, updateTodo,
} from './todo.actions';
import { TodoService } from '../todo.service';

@Injectable()
export class TodoEffects implements OnInitEffects {
  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() =>
        this.todoService.getAllTodos().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((error) =>
            of(loadTodosFailed({ error: error.toString() }))
          )
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(({ todo }) =>
        this.todoService.addTodo(todo).pipe(
          map((todo) => todoAddedSuccess({ todo })),
          catchError((error) =>
            of(todoAddedFailed({ error: error.toString() }))
          )
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      switchMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map((todo) => todoDeletedSuccess({ todo })),
          catchError((error) =>
            of(todoDeletedFailed({ error: error.toString() }))
          )
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap(({ updatedTodo }) =>
        this.todoService.updateTodo(updatedTodo).pipe(
          map((todo) => todoUpdatedSuccess({ todo })),
          catchError((error) =>
            of(todoUpdatedFailed({ error: error.toString() }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}

  ngrxOnInitEffects() {
    return init();
  }
}
