import {
    Controller, RequestMapping, RequestMethod, Profile, RequestContextHolder, Inject, View
} from "@sklechko/framework";
import {GreetService} from "../services/GreetService";
import { Environment } from "@sklechko/framework/lib/di/Environment";
import { TimedDecorator } from "../postProcessors/TimedDecorator";

class AbstractGreetingCtrl {

    @Inject()
    greetService: GreetService;

}

@Profile('greeting')
@Controller()
export class GreetingsController extends AbstractGreetingCtrl {

    @Inject()
    private env: Environment;

    getName() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(RequestContextHolder.getRequest().params.name);
            }, 2000);
        });
    }

    @TimedDecorator()
    @View("sayHi")
    @RequestMapping({ path: '/sayHello/:name', method: RequestMethod.GET })
    async sayHello () {
        var name = await this.getName();
        return { greet: `Hi ${name}` };
    }

    @View()
    @RequestMapping({ path: '/hi', method: RequestMethod.GET })
    async sayHi() {
        var greet = await this.greetService.getGreeting();
        var someProperty = this.env.getProperty('some.property');
        var preHandleMessage = (<any> RequestContextHolder.getResponse()).preHandleProperty;
        return { greet, someProperty, preHandleMessage };
    }
}