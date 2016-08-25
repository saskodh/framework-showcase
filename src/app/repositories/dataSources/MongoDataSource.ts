import {Component, Value, PostConstruct, Profile, PreDestroy} from "@sklechko/framework";
import {MongoClient} from "mongodb";
import {Db} from "mongodb";

@Profile('mongo')
@Component()
export class MongoDataSource {

    @Value('db.mongo.connectionString')
    private connectionString: string;

   @Value('db.mongo.options.poolSize')
    private poolSize: number;

    private db: Db;

    public async getConnection(): Promise<Db> {
        return this.db;
    }

    @PostConstruct()
    private async createConnection() {
        console.log(`Creating pool to MongoDB with ${this.poolSize} connections.`);
        let options = {
            poolSize: this.poolSize,
        };
        this.db = await MongoClient.connect(this.connectionString , options);
    }

    @PreDestroy()
    private async closeConnection() {
        console.log(`Closing the connection pool to MongoDB.`);
        await this.db.close();
    }
}