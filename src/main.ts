import {WebAppInitializer} from "./app/WebAppInitializer";
import {ApplicationContext} from "@sklechko/framework";
import {AppConfig} from "./app/AppConfig"

let applicationContext = new ApplicationContext(AppConfig);
applicationContext.registerExitHook();

let start = async function() {
    await WebAppInitializer.bootstrap(applicationContext);
    console.log('Application successfully started on port: ', WebAppInitializer.PORT);
};

start().catch((error) => {
    console.error(error);
    process.exit(1);
});
