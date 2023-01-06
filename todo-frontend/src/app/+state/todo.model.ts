export interface Todo {
  id: number;
  todo: string;
  done: boolean;
}

export interface CreateAndUpdateTodo {
  todo: string;
  done: boolean;
}
