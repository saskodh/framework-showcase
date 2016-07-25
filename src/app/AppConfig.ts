import { Configuration, PropertySource, Import } from "@sklechko/framework";
import {ControllersConfig} from "./controllers/ControllersConfig";
import {RepositoriesConfig} from "./repositories/RepositoriesConfig";
import {ServicesConfig} from "./services/ServicesConfig";

@Import(ControllersConfig, RepositoriesConfig, ServicesConfig)
@PropertySource(__dirname+'/../resources/app.properties.json')
@Configuration()
export class AppConfig {}