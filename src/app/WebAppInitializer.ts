import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as fileSystem from "fs";
import {Application} from "express-serve-static-core";
import {Router} from "express-serve-static-core";
import {ApplicationContext} from "@sklechko/framework";

export class WebAppInitializer {

    public static PORT: number = 3000;

    private app: Application;


    public static bootstrap(applicationContext?: ApplicationContext): WebAppInitializer {
        var initializer = new WebAppInitializer();
        if (applicationContext) {
            initializer.getApplication().use(applicationContext.getRouter());
        }

        initializer.getApplication().listen(WebAppInitializer.PORT, function () {
            console.log('Application successfully started on port: ', WebAppInitializer.PORT);
        });

        return initializer;
    }

    constructor() {
        this.app = express();

        this.config();
        this.routes();
    }

    getApplication () {
        return this.app
    }

    private config() {
        // mount logger
        //this.app.use(logger("dev"));

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }

    private routes() {
        // create router
        let router: Router = express.Router();

        // create routes
        // send index.html with an angular app
        router.get('/', (request, response) => {
            fileSystem.readFile('public/index.html', function (error, result) {
                if (error) {
                    response.writeHead(404);
                    response.end();
                } else {
                    response.writeHead(200);
                    response.end(result)
                }
            });
        });

        // use router middleware
        this.app.use(router);
    }
}