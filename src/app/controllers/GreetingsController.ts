import {Controller, RequestMapping, RequestMethod, Profile, Inject, View} from "@sklechko/framework";
import {Request} from "express-serve-static-core";
import {GreetService} from "../services/GreetService";

class AbstractGreetingCtrl {

    @Inject()
    greetService: GreetService;

}

@Profile('greeting')
@Controller()
export class GreetingsController extends AbstractGreetingCtrl {

    getName(request: Request) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(request.params.name);
            }, 2000);
        });
    }
    
    @View("sayHi")
    @RequestMapping({ path: '/sayHello/:name', method: RequestMethod.GET })
    async sayHello (request: Request) {
        try {
            var name = await this.getName(request);
        } catch (e) {
            console.error('Error: ', e);
        }
        return {
            greet: 'Hello world ' + name
        };
    }

    @View()
    @RequestMapping({ path: '/hi', method: RequestMethod.GET })
    async sayHi() {
        var greet = await this.greetService.getGreeting();
        return {greet: greet};
    }
}