import { Interceptor } from "@sklechko/framework";
import Request = Express.Request;

@Interceptor()
export class TestInterceptor implements Interceptor {


    preHandle(request, response) {
        if(request.originalUrl === '/hi'){
            response.preHandleProperty = 'interceptor preHandling works!';
        }
    }

    postHandle(request, response) {
        if(request.originalUrl === '/hi'){
            response.result.postHandleProperty = 'interceptor postHandling works!';
        }
    }

}