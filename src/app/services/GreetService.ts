import {Component} from "@sklechko/framework";

@Component()
export class GreetService {

    private getGreet() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve('World peace!!');
            }, 2000);
        });
    }

    async getGreeting() {
        return await this.getGreet();
    }
}