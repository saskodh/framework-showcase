import {TodoRepository} from "../repository/TodoRepository";
import {TodoModel} from "../models/TodoModel";
import {RequestMethod, RequestMapping, Controller, Inject, Value} from "@sklechko/framework";

class AbstractController {

    @RequestMapping({ path: '/tralala', method: RequestMethod.GET })
    async tralalal () {
        return {
            hello: 'world'
        }
    }
}

@Controller()
export class TodoController extends AbstractController {

    @Inject(TodoRepository)
    private todoRepository: TodoRepository;

    @Value('todo.defaultName')
    private property: string;

    constructor() {
        super();
    }

    @RequestMapping({ path: '/getAll', method: RequestMethod.GET })
    async getAllTodos() {
        return await this.todoRepository.getAll();
    }

    @RequestMapping({ path: '/add', method: RequestMethod.PUT })
    async addTodo(request) {
        let name = request.params.name || this.property;
        var todo = new TodoModel(name, request.params.description);
        return await this.todoRepository.save(todo);
    }

    @RequestMapping({ path: '/delete', method: RequestMethod.DELETE })
    async deleteTodo(request) {
        let todo = await this.todoRepository.get(request.params.todoId);
        return await this.todoRepository.delete(todo);
    }
}