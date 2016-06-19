import {WebAppInitializer} from "./app/WebAppInitializer";
import {ComponentScan, PropertySource, Configuration, ApplicationContext} from "@sklechko/framework";

var properties = require('./resources/app.properties.json');

@ComponentScan(__dirname + '/app')
@PropertySource(properties)
@Configuration()
class Config {}

let applicationContext = new ApplicationContext(Config);
var app = WebAppInitializer.bootstrap(applicationContext).getApplication();