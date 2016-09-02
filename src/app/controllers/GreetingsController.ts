import {
    Controller, RequestMapping, RequestMethod, Profile, RequestContextHolder, Inject, View
} from "@sklechko/framework";
import {GreetService} from "../services/GreetService";
import { Environment } from "@sklechko/framework/lib/di/Environment";
import { Timed } from "../postProcessors/timed/Timed";
import { CacheableService } from "../services/CacheableService";

class AbstractGreetingCtrl {

    @Inject()
    greetService: GreetService;

}

@Profile('greeting')
@Controller()
export class GreetingsController extends AbstractGreetingCtrl {

    @Inject()
    private env: Environment;

    @Inject()
    private cacheableService: CacheableService;

    getName() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(RequestContextHolder.getRequest().params.name);
            }, 5000);
        });
    }

    @Timed()
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

    @RequestMapping({ path: '/hi/cacheable', method: RequestMethod.GET })
    async cacheable () {
        await this.cacheableService.getModel('name', 2, new CustomClass());
        return { greet: 'Model Saved !!!' };
    }

    @RequestMapping({ path: '/hi/cacheEvict', method: RequestMethod.GET })
    async deleteCache () {
        await this.cacheableService.deleteModel('name');
        return { greet: 'Model deleted !!!' };
    }

    @RequestMapping({ path: '/hi/cachePut', method: RequestMethod.GET })
    async saveCache () {
        await this.cacheableService.getModelPut('otherProp', new CustomClass());
        return { greet: 'Model Saved and cache updated!!!' };
    }
}

export class CustomClass {
    private property1;
    property2;
    private prop;
    private nestedProp;

    constructor() {
        this.prop = 'name';
        this.property2 = 'publicProperty';
        this.nestedProp = new OtherClass();
    }

    methodOne(){}
}

export class OtherClass {
    private className;

    constructor() {
        this.className = 'class One';
    }
}