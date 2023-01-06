import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CoreState } from './+state/todo.reducer';
import { addTodo } from './+state/todo.actions';

@Component({
  selector: 'todo-input',
  template: `
    <form [formGroup]="todoForm" class="bg-white shadow-md rounded p-8 mb-4">
      <div class="relative">
        <input
          type="text"
          formControlName="newTodo"
          class="form-input border-slate-400 border py-3 px-4 block h-12 w-full leading-5 rounded-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Enter a TODO"
        />
        <button
          type="button"
          (click)="submit()"
          class="absolute rounded-r-full -right-3 -top-2 h-12 w-16 mt-2 mr-3 py-2 px-3 text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 text-2xl"
        >
          +
        </button>
      </div>
    </form>
  `,
  imports: [ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInputComponent {
  todoForm = this.fb.group({
    newTodo: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private store: Store<CoreState>) {}

  submit() {
    if (!this.todoForm.value.newTodo) {
      return;
    }

    this.store.dispatch(
      addTodo({
        todo: {
          todo: this.todoForm.value.newTodo,
          done: false,
        },
      })
    );

    this.todoForm.reset();
  }
}
