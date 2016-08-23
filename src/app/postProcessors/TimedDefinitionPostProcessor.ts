import { IComponentDefinitionPostProcessor } from "@sklechko/framework/lib/processors/ComponentDefinitionPostProcessor";
import { ComponentDefinitionPostProcessor } from "@sklechko/framework";
import { ProxyUtils } from "@sklechko/framework/lib/helpers/ProxyUtils";
import { ReflectUtils } from "@sklechko/framework/lib/helpers/ReflectUtils";
import { TimedDecoratorUtil } from "./TimedDecorator";

@ComponentDefinitionPostProcessor()
export class TimedDefinitionPostProcessor implements IComponentDefinitionPostProcessor {

    postProcessDefinition(componentConstructor: FunctionConstructor) {
        class TimedProxy extends componentConstructor {}

        for(let methodName of ReflectUtils.getAllMethodsNames(componentConstructor)) {
            if(methodName !== 'constructor') {
                if(TimedDecoratorUtil.isTimedDecoratorApplied(componentConstructor.prototype)) {
                    let originalMethod = TimedProxy.prototype[methodName];
                    let proxiedMethod = ProxyUtils.createMethodProxy(originalMethod, async (methodRef, instance, args) => {
                        console.log(methodName + ' started executing on ' + this.createDateString());
                        let result = await Promise.race([Reflect.apply(methodRef, instance, args)]);
                        console.log(methodName + ' finished with execution on ' + this.createDateString());
                        return result;
                    });
                    Reflect.set(TimedProxy.prototype, methodName, proxiedMethod);
                }
            }
        }
        return TimedProxy;
    }

    private createDateString(): String {
        let currentdate = new Date();
        return currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + ","
            + currentdate.getMilliseconds();
    }
}