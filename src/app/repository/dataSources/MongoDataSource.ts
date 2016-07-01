import {Component, Value} from "@sklechko/framework";
import {MongoClient} from "mongodb";
import {Db} from "mongodb";

@Component()
export class MongoDataSource {

    @Value('db.mongo.connectionString')
    private connectionString: string;

   @Value('db.mongo.options.poolSize')
    private poolSize: number;

    private db: Db;

    public async getConnection(): Promise<Db> {
        if(!this.db) {
            await this.createConnection();
        }
        return this.db;
    }

    private async createConnection() {
        let options = {
            poolSize: this.poolSize,
        };
        this.db = await MongoClient.connect(this.connectionString , options);
    }
}