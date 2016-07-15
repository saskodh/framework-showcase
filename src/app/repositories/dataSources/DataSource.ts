import {Component, Value} from "@sklechko/framework";
import * as pg from "pg";
import {Client} from "pg";

@Component()
export class DataSource {
    
    @Value('db.pg.host')
    private host: string;
    
    @Value('db.pg.database')
    private database: string;

    @Value('db.pg.port')
    private port: number;

    @Value('db.pg.pool.minConnections')
    private minConnections: number;
    
    @Value('db.pg.pool.maxConnections')
    private maxConnections: number;

    @Value('db.pg.pool.idleTimeoutMillis')
    private idleTimeoutMillis: number;
    
    private pool;
    
    public async getConnection():Promise<Client> {
        return await this.getPool().connect();
    }
    
    private getPool() {
        if(!this.pool) {
            this.createPool();
        }
        return this.pool;
    }
    
    private createPool() {
        let config = {
            database: this.database, //env var: PGDATABASE
            port: this.port, //env var: PGPORT
            min: this.minConnections, // min number of clients in the pool
            max: this.maxConnections, // max number of clients in the pool
            idleTimeoutMillis: this.idleTimeoutMillis, // how long a client is allowed to remain idle before being closed
        };
        // NOTE: we cast because the typing is not correct. Remove when typing is upgraded
        this.pool = new (<any> pg).Pool(config);
    }
}