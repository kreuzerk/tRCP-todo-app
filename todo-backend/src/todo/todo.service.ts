import { Injectable } from '@nestjs/common';
import { CreateAndUpdateTodo } from './create-and-update.dto';

export interface Todo {
  id: number;
  todo: string;
  done: boolean;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 0,
      todo: 'Clean the kitchen',
      done: false,
    },
    {
      id: 1,
      todo: 'Bring out the trash',
      done: false,
    },
  ];

  create(createTodoDto: Todo): Todo {
    this.todos.push(createTodoDto);
    return createTodoDto;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | null {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, updatedTodo: CreateAndUpdateTodo) {
    this.todos = this.todos.map((t) =>
      t.id === id
        ? {
            ...updatedTodo,
            id,
          }
        : t,
    );
    return updatedTodo;
  }

  remove(id: number): Todo {
    const todoToDelete = this.todos.find((todo) => todo.id === id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return todoToDelete;
  }
}
