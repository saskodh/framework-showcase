import {Component, Inject} from "@sklechko/framework";
import {TodoModel} from "../models/TodoModel";
import {ITodoRepository, ITodoRepositoryToken} from "../repository/ITodoRepository";

@Component()
export class TodoService {

    @Inject(ITodoRepositoryToken)
    todoRepository: ITodoRepository;

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