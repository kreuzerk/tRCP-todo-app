import {initTRPC} from "@trpc/server";
import {z} from "zod";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

let id = 1;

let todos = [
    {
        id: 0,
        todo: 'Clean the kitchen',
        done: false,
    },
    {
        id: 1,
        todo: 'Bring out the trash',
        done: false,
    }
]

export const todosRouter = router({
    todos: publicProcedure
        .query(_ => todos),
    addTodo: publicProcedure
        .input(
            z.object({
                todo: z.string(),
                done: z.boolean(),
            }),
        )
        .mutation(({input}) => {
            const newTodo = {
                id: ++id,
                ...input,
            }
            todos.push(newTodo);
            return newTodo;
        }),
    updateTodo: publicProcedure
        .input(
            z.object({
                id: z.number(),
                todo: z.string(),
                done: z.boolean(),
            }),
        )
        .mutation(({input}) => {
            todos = todos.map((t) =>
                t.id === input.id
                    ? input
                    : t,
            );
            return input;
        }),
    deleteTodo: publicProcedure
        .input(
            z.number()
        )
        .mutation(({input}) => {
            const todoToDelete = todos.find((todo) => todo.id === input);
            todos = todos.filter((todo) => todo.id !== input);
            return todoToDelete;
        }),
});

export type TodosRouter = typeof todosRouter;
