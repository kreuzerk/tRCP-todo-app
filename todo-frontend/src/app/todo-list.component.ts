import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTodos } from './+state/todo.selector';
import { AsyncPipe, JsonPipe, NgFor, NgForOf } from '@angular/common';
import { CoreState } from './+state/todo.reducer';
import { deleteTodo, updateTodo } from './+state/todo.actions';
import { Todo } from './+state/todo.model';

@Component({
  selector: 'todo-list',
  template: `
    <div class="mb-4">
      <ul class="list-reset">
        <li
          *ngFor="let todoItem of todos$ | async"
          class="flex items-center justify-between mb-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="flex items-center">
            <input
              #checkbox
              [checked]="todoItem.done"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              (change)="toggleDone(todoItem, checkbox.checked)"
            />
            <label class="ml-2 text-sm leading-5 text-gray-700" for="todos">
              {{ todoItem.todo }}
            </label>
          </div>
          <span
            (click)="deleteTodo(todoItem.id)"
            class="material-symbols-outlined hover:text-blue-800 cursor-pointer"
            >delete</span
          >
        </li>
      </ul>
    </div>
  `,
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgForOf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  todos$ = this.store.select(selectTodos);

  constructor(private store: Store<CoreState>) {}

  deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }

  toggleDone(todo: Todo, checked: boolean) {
    this.store.dispatch(
      updateTodo({
        updatedTodo: {
          ...todo,
          done: checked,
        },
      })
    );
  }
}
