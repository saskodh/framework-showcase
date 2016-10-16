import {WebAppInitializer} from "./app/WebAppInitializer";
import {ApplicationContext} from "@sklechko/framework";
import {AppConfig} from "./app/AppConfig"

var startApp = async function () {
    let applicationContext = await new ApplicationContext(AppConfig).start();
    applicationContext.registerExitHook();

    var app = await WebAppInitializer.bootstrapWithContext(applicationContext);
    console.log(`Application up and running on port: ${WebAppInitializer.PORT}`);
};

startApp().catch((error) => {
    console.error(error);
    process.exit(1);
});
