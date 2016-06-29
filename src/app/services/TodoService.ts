import {Component, Inject} from "@sklechko/framework";
import {TodoRepositoryPgImpl} from "../repository/TodoRepositoryPgImpl";
import {TodoModel} from "../models/TodoModel";

@Component()
export class TodoService {

    @Inject(TodoRepositoryPgImpl)
    todoRepository: TodoRepositoryPgImpl;

    async get(id: number): Promise<TodoModel> {
        return this.todoRepository.get(id);
    }

    async getAll(): Promise<TodoModel[]> {
        return this.todoRepository.getAll();
    }

    async save(todo: TodoModel): Promise<TodoModel> {
        return this.todoRepository.save(todo);
    }

    async update(todo: TodoModel): Promise<TodoModel> {
        return this.todoRepository.update(todo);
    }

    async delete(todoId: number): Promise<{ success: boolean }> {
        return this.todoRepository.delete(todoId);
    }
}