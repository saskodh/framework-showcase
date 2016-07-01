import {TodoModel} from "../models/TodoModel";

export const ITodoRepositoryToken = Symbol('I-TODO-REPOSITORY-TOKEN');

export interface ITodoRepository {

    /**
     * Gets the todo with the given id.
     * @param todoId todo id
     * @returns todo
     * */
    get(todoId: number | string): Promise<TodoModel>;

    /**
     * Gets all todos.
     * @returns all todos
     * */
    getAll(): Promise<TodoModel[]>;

    /**
     * Persists the given todo.
     * @param todo todo
     * @returns the persisted todo
     * */
    save(todo: TodoModel): Promise<TodoModel>;

    /**
     * Updates the given todo.
     * @param todo todo
     * @returns the updated todo
     * */
    update(todo: TodoModel): Promise<TodoModel>;

    /**
     * Deletes the todo with the given id.
     * @param todoId todo id
     * @returns delete result
     * */
    delete(todoId: number | string): Promise<{ success: boolean }>;

}