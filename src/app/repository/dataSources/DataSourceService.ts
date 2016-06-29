import {QueryResult} from "pg";
import {Component, Inject} from "@sklechko/framework";
import {DataSource} from "./DataSource";

@Component()
export class DataSourceService {

    @Inject(DataSource)
    private dataSource: DataSource;

    public async executeQuery(sqlQuery: string, parameters?: Array<any>): Promise<QueryResult> {
        let client = await this.dataSource.getConnection();
        try {
            // NOTE: workaround because typings for 'pg' are not correct. Remove this on when they are updated.
            let queryResult = await <any> client.query(sqlQuery, parameters);
            return <QueryResult> queryResult;
        } catch (err) {
            console.error(err);
        } finally {
            (<any> client).release();
        }
        return null;
    }
}