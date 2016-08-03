import { Configuration, PropertySource, Import } from "@sklechko/framework";
import {ControllersConfig} from "./controllers/ControllersConfig";
import {RepositoriesConfig} from "./repositories/RepositoriesConfig";
import {ServicesConfig} from "./services/ServicesConfig";
import { ActiveProfiles } from "@sklechko/framework/lib/decorators/ProfileDecorators";

@Import(ControllersConfig, RepositoriesConfig, ServicesConfig)
@PropertySource(__dirname+'/../resources/app.properties.json')
@ActiveProfiles('mongo')
@Configuration()
export class AppConfig {}