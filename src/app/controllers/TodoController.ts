import {TodoModel} from "../models/TodoModel";
import {
    RequestMethod, RequestMapping, Controller, Inject, Value
} from "@sklechko/framework";

import {Request} from "express-serve-static-core";
import {TodoService} from "../services/TodoService";

@RequestMapping({ path: '/todos' })
@Controller()
export class TodoController {

    @Inject()
    private todoService: TodoService;

    @Value('todo.defaultName')
    private defaultName: string;

    @RequestMapping({ path: '/', method: RequestMethod.GET })
    async getAllTodos() {
        return await this.todoService.getAll();
    }

    @RequestMapping({ path: '/:id', method: RequestMethod.GET})
    async getTodo(request: Request) {
        let id = request.params.id;
        return await this.todoService.get(id);
    }

    @RequestMapping({ path: '/', method: RequestMethod.PUT })
    async addTodo(request: Request) {
        let name = request.body.name || this.defaultName;
        var todo = new TodoModel(name, request.body.description);
        return await this.todoService.save(todo);
    }

    @RequestMapping({ path: '/:id', method: RequestMethod.POST })
    async updateTodo(request: Request) {
        let todoUpdate = <TodoModel> request.body;
        let todo = new TodoModel(todoUpdate.name, todoUpdate.description);
        todo.id = request.params.id;
        todo.completed = todoUpdate.completed;
        return await this.todoService.update(todo);
    }

    @RequestMapping({ path: '/:id', method: RequestMethod.DELETE })
    async deleteTodo(request: Request) {
        let todoId = request.params.id;
        return await this.todoService.delete(todoId);
    }
}