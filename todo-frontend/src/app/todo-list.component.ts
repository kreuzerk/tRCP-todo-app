import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTodos } from './+state/todo.selector';
import {AsyncPipe, JsonPipe, NgClass, NgFor, NgForOf, NgIf} from '@angular/common';
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
                      class="flex items-center justify-between mb-4 bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 cursor-pointer"
                      (click)="checkbox.click()"
              >
                  <div class="flex items-center">
                      <input
                              #checkbox
                              [checked]="todoItem.done"
                              type="checkbox"
                              class="hidden form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              (change)="toggleDone(todoItem, checkbox.checked)"
                      />
                      <span class="material-symbols-outlined text-red-800" *ngIf="!todoItem.done">
radio_button_unchecked
</span>
                      <span class="material-symbols-outlined text-green-600" *ngIf="todoItem.done" >
check_circle
</span>
                      <label class="ml-2 text-lg leading-5 text-gray-700" for="todos" [ngClass]="{
                'line-through': todoItem.done
                }">
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
  imports: [AsyncPipe, JsonPipe, NgForOf, NgClass, NgIf],
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
