import {TodoModel} from "../models/TodoModel";
import {Component, Inject} from "@sklechko/framework";
import {ITodoRepository, ITodoRepositoryToken} from "./ITodoRepository";
import {DataSourceService} from "./dataSources/DataSourceService";
import * as _ from 'lodash';

@Component(ITodoRepositoryToken)
export class TodoRepositoryPgImpl implements ITodoRepository {

    @Inject()
    private dataSourceService: DataSourceService;

    async get(todoId: number): Promise<TodoModel> {
        let query = 'select * from TodoModel where id = $1';
        let todoResult = await this.dataSourceService.executeQuery(query, [todoId]);
        return TodoRepositoryPgImpl.convertTodoResult(todoResult.rows[0]);
    }

    async getAll(): Promise<Array<TodoModel>> {
        let query = 'select * from TodoModel';
        let todoResult = await this.dataSourceService.executeQuery(query);
        return TodoRepositoryPgImpl.convertTodoResultArray(todoResult.rows);
    }

    async save(todo: TodoModel): Promise<TodoModel> {
        let query = 'insert into TodoModel(name, description, completed) values($1, $2, $3) returning id';
        let insertResult = await this.dataSourceService.executeQuery(query, [todo.name, todo.description, todo.completed]);
        return this.get(insertResult.rows[0].id);
    }

    async update(todo: TodoModel): Promise<TodoModel> {
        let query = 'update TodoModel set name = $2, description = $3, completed = $4 where id = $1';
        await this.dataSourceService.executeQuery(query, [todo.id, todo.name, todo.description, todo.completed]);
        let updatedTodo = await this.get(todo.id);
        return TodoRepositoryPgImpl.convertTodoResult(updatedTodo);
    }

    async delete(todoId: number): Promise<{ success: boolean }> {
        let query = 'delete from TodoModel where id = $1';
        await this.dataSourceService.executeQuery(query, [todoId]);
        return { success: true };
    }

    private static convertTodoResultArray(result: Array<any>): Array<TodoModel> {
        return _.map(result, TodoRepositoryPgImpl.convertTodoResult);
    }

    private static convertTodoResult(result: any): TodoModel {
        let todo: TodoModel = new TodoModel(result.name, result.description);
        todo.id = result.id;
        todo.completed = result.completed;
        return todo;
    }
}