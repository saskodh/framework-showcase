import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { Application } from "express-serve-static-core";
import { ApplicationContext } from "@sklechko/framework";

export class WebAppInitializer {

    public static PORT: number = 3000;

    private app: Application;


    public static async bootstrap(applicationContext?: ApplicationContext): Promise<Application> {
        var initializer = new WebAppInitializer();
        if (applicationContext) {
            await applicationContext.start();
            initializer.getApplication().use(applicationContext.getRouter());
        }

        await this.startServer(initializer);
        return initializer.getApplication();
    }

    private static async startServer(initializer: WebAppInitializer) {
        return new Promise((resolve) => {
            initializer.getApplication().listen(this.PORT, function () {
                resolve(true);
            });
        });
    }

    constructor() {
        this.app = express();

        this.config();
    }

    getApplication() {
        return this.app
    }

    private config() {
        // mount logger
        //this.app.use(logger("dev"));

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(bodyParser.urlencoded({extended: true}));

        //view setup
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');

        // add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        // catch 404 and forward to error handler
        this.app.use(function (err: any, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
}