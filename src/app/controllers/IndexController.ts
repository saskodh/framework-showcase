import {Controller, View, RequestMapping, RequestMethod, Inject} from "@sklechko/framework";
import {TodoService} from "../services/TodoService";

@Controller()
export class IndexController {

    @Inject()
    private todoService: TodoService;

    @View()
    @RequestMapping({ path: '/', method: RequestMethod.GET })
    async index(){
        let todos = await this.todoService.getAll();
        return {todos};
    }
}