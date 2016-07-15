import {Controller, RequestMapping, RequestMethod, Inject} from "@sklechko/framework";
import {Request} from "express-serve-static-core";
import {GreetService} from "../services/GreetService";
import {CacheableService} from "../services/CacheableService";

class AbstractGreetingCtrl {

    @Inject()
    greetService: GreetService;

}

@Controller()
export class GreetingsController extends AbstractGreetingCtrl {

    @Inject()
    private cacheService: CacheableService;

    getName(request: Request) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(request.params.name);
            }, 2000);
        });
    }

    @RequestMapping({ path: '/sayHello/:name', method: RequestMethod.GET })
    async sayHello (request: Request) {
        try {
            var name = await this.getName(request);
        } catch (e) {
            console.error('Error: ', e);
        }
        return {
            message: 'Hello world ' + name
        };
    }

    @RequestMapping({ path: '/cache', method: RequestMethod.GET })
    async get() {
        return await this.cacheService.getModel('id');
    }

    @RequestMapping({ path: '/cacheDelete', method: RequestMethod.GET })
    async delete() {
        return await this.cacheService.deleteModel('id');
    }
}