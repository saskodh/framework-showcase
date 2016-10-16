import * as path from "path";
import * as bodyParser from "body-parser";
import * as express from "express";
import { Application } from "express-serve-static-core";
import { ApplicationContext } from "@sklechko/framework";

export class WebAppInitializer {

    public static PORT: number = 3000;

    public static async bootstrap():Promise<Application> {
        return await this.start(this.configure(this.create()));
    }

    public static async bootstrapWithContext(appContext: ApplicationContext) {
        var app = this.configure(this.create());
        app.use(appContext.getRouter());
        return this.start(app);
    }

    private static async start(app: Application):Promise<Application> {
        return new Promise<Application> ((resolve) => app.listen(this.PORT, () => resolve(app)));
    }

    private static create() {
        return express();
    }

    private static configure(app: Application):Application {
        // add json form parser
        app.use(bodyParser.json());

        // add query string parser
        app.use(bodyParser.urlencoded({extended: true}));

        // configure view engine
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'ejs');

        // configure static paths
        app.use(express.static(path.join(__dirname, "public")));

        return app;
    }
}