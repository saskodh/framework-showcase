import { Component, Value, PostConstruct, Profile, ThreadLocal, RequestContextHolder } from "@sklechko/framework";
import * as pg from "pg";
import { Client } from "pg";

@Profile('pg')
@Component()
export class DataSource {

    @Value('db.pg.host')
    private host: string;

    @Value('db.pg.database')
    private database: string;

    @Value('db.pg.port')
    private port: number;

    @Value('db.pg.username')
    private username: string;

    @Value('db.pg.password')
    private password: string;

    @Value('db.pg.pool.minConnections')
    private minConnections: number;

    @Value('db.pg.pool.maxConnections')
    private maxConnections: number;

    @Value('db.pg.pool.idleTimeoutMillis')
    private idleTimeoutMillis: number;

    private connectionPool;

    @ThreadLocal()
    private connection: Client;

    public async getConnection(): Promise<Client> {
        if (!this.connection) {
            console.log('Opening new database connection..');
            this.connection = await this.connectionPool.connect();
            this.registerConnectionRelease(this.connection);
        }
        return this.connection;
    }

    @PostConstruct()
    private createConnectionPool() {
        console.log("Creating PostGRESQL connection pool...");
        let config = {
            user: this.username,
            password: this.password,
            database: this.database, //env var: PGDATABASE
            port: this.port, //env var: PGPORT
            min: this.minConnections, // min number of clients in the pool
            max: this.maxConnections, // max number of clients in the pool
            idleTimeoutMillis: this.idleTimeoutMillis, // how long a client is allowed to remain idle before being closed
        };
        // NOTE: we cast because the typing is not correct. Remove when typing is upgraded
        this.connectionPool = new (<any> pg).Pool(config);
    }

    private registerConnectionRelease(connection) {
        RequestContextHolder.getResponse().on('finish', () => {
            console.log('Releasing old database connection.');
            connection.release();
        });
    }
}