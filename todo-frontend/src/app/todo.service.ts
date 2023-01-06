import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import {Observable, of} from 'rxjs';

import type {TodosRouter} from '../../../todo-backend/todo/todo.route';

import {CreateAndUpdateTodo, Todo} from "./+state/todo.model";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

const ENDPOINT = 'http://localhost:3000/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private client = createTRPCProxyClient<TodosRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000',
      }),
    ],
  });

  constructor(private http: HttpClient) {
  }

  public getAllTodos(): Observable<Todo[]> {
    return fromPromise(this.client.todos.query());
  }

  public addTodo(todo: CreateAndUpdateTodo): Observable<Todo> {
    return fromPromise(this.client.addTodo.mutate(todo));
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return fromPromise(this.client.updateTodo.mutate(todo));
  }

  public deleteTodo(id: number): Observable<Todo> {
    return fromPromise(this.client.deleteTodo.mutate(id));
  }
}
