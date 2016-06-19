import {TodoModel} from "../models/TodoModel";
import {Component} from "@sklechko/framework";

@Component()
export class TodoRepository {
    // NOTE: for the moment we don't have DB integration and we store in memory
    private todoStore: Array<TodoModel> = [];

    constructor() {
        // initial todos :D
        this.todoStore.push(new TodoModel('Drink coffee', 'Lorem ipsum'));
        this.todoStore.push(new TodoModel('Get the job done', 'Hell yeah!'));
    }

    async get(todoId: number): Promise<TodoModel> {
        return new TodoModel('', '');
    }
    async getAll(){
        return this.todoStore;
    }
    async save(todo: TodoModel) {
        this.todoStore.push(todo);
        return true;
    }
    async update(todo: TodoModel) {
        return true;
    }
    async delete(todo: TodoModel) {
        return true;
    }
}