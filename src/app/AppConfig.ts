import {Configuration, PropertySource, Import, EnableCaching} from "@sklechko/framework";
import {ControllersConfig} from "./controllers/ControllersConfig";
import {RepositoriesConfig} from "./repositories/RepositoriesConfig";
import {ServicesConfig} from "./services/ServicesConfig";
var properties = require('../resources/app.properties.json');

@Import(ControllersConfig, RepositoriesConfig, ServicesConfig)
@EnableCaching()
@PropertySource(properties)
@Configuration()
export class AppConfig {}