import { Interceptor } from "@sklechko/framework";
import Request = Express.Request;

@Interceptor()
export class TestInterceptor implements Interceptor {


    preHandle(request, response) {
        if(request.originalUrl === '/hi'){
            response.preHandleProperty = 'interceptor preHandling works!';
        }
        //response.json({'someObjectKey': 'someVal'});
        //return false;
    }

    postHandle(request, response) {
        if(request.originalUrl === '/hi'){
            //response.result.postHandleProperty = 'interceptor postHandling works!';
            response.$$frameworkData.model.postHandleProperty = 'interceptor postHandling works!';
        }
    }

    afterCompletion(request, response) {
        if(request.originalUrl === '/hi'){
            console.log('interceptor afterCompletion works!');
        }
    }

}