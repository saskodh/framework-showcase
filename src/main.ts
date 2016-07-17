import {WebAppInitializer} from "./app/WebAppInitializer";
import {ApplicationContext} from "@sklechko/framework";

import {AppConfig} from "./app/AppConfig"

(async function start() {

    let applicationContext = new ApplicationContext(AppConfig);
    let app = await WebAppInitializer.bootstrap(applicationContext);
    console.log('Application successfully started on port: ', WebAppInitializer.PORT);

    applicationContext.registerExitHook();
})();
