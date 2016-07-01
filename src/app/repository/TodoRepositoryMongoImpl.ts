import {Component, Inject, Profile} from "@sklechko/framework";
import {MongoDataSource} from "./dataSources/MongoDataSource";
import {ITodoRepository, ITodoRepositoryToken} from "./ITodoRepository";
import {TodoModel} from "../models/TodoModel";
import {Db} from "mongodb";
import {ObjectID} from "mongodb";
import * as _ from 'lodash';

@Profile('mongo')
@Component(ITodoRepositoryToken)
export class TodoRepositoryMongoImpl implements ITodoRepository {

    @Inject()
    private mongoDataSource: MongoDataSource;

    async get(todoId:number | string):Promise<TodoModel> {
        let db: Db = await this.mongoDataSource.getConnection();
        let query = { "_id" : new ObjectID(todoId) };
        let todoCollection = await db.collection('todoCollection').find(query).toArray();
        return TodoRepositoryMongoImpl.convertTodoResultArray(todoCollection).pop();
    }

    async getAll():Promise<TodoModel[]> {
        let db: Db = await this.mongoDataSource.getConnection();
        let todoCollection = await db.collection('todoCollection').find().toArray();
        return TodoRepositoryMongoImpl.convertTodoResultArray(todoCollection);
    }

    async save(todo:TodoModel):Promise<TodoModel> {
        let db: Db = await this.mongoDataSource.getConnection();
        let insert = { name : todo.name, description : todo.description, completed : todo.completed };
        let persistedTodo = await db.collection('todoCollection').insertOne(insert);
        let persistedTodoId: string = persistedTodo.insertedId.toString();
        return await this.get(persistedTodoId);
    }

    async update(todo:TodoModel):Promise<TodoModel> {
        let db: Db = await this.mongoDataSource.getConnection();
        let query = { "_id" : new ObjectID(todo.id) };
        let update = { $set: { name : todo.name, description : todo.description, completed : todo.completed } };
        let persistedTodo = await db.collection('todoCollection').findOneAndUpdate(query, update);
        return this.get(persistedTodo.value._id.toString());
    }

    async delete(todoId:number | string):Promise<{success:boolean}> {
        let db: Db = await this.mongoDataSource.getConnection();
        let query = { "_id" : new ObjectID(todoId) };
        await db.collection('todoCollection').deleteOne(query);
        return { success: true };
    }

    private static convertTodoResultArray(result: Array<any>): Array<TodoModel> {
        return _.map(result, TodoRepositoryMongoImpl.convertTodoResult);
    }

    private static convertTodoResult(result: any): TodoModel {
        let todo: TodoModel = new TodoModel(result.name, result.description);
        todo.id = result._id;
        todo.completed = result.completed;
        return todo;
    }
}