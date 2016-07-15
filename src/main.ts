import {WebAppInitializer} from "./app/WebAppInitializer";
import {ApplicationContext} from "@sklechko/framework";

import {AppConfig} from "./app/AppConfig"

let applicationContext = new ApplicationContext(AppConfig);
var app = WebAppInitializer.bootstrap(applicationContext).getApplication();