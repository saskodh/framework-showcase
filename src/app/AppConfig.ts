import { Configuration, PropertySource, Import } from "@sklechko/framework";
import { ControllersConfig } from "./controllers/ControllersConfig";
import { RepositoriesConfig } from "./repositories/RepositoriesConfig";
import { ServicesConfig } from "./services/ServicesConfig";
import { InterceptorsConfig } from "./interceptors/InterceptorsConfig";

@Import(ControllersConfig, RepositoriesConfig, ServicesConfig, InterceptorsConfig)
@PropertySource(__dirname + '/../resources/app.properties.json')
@Configuration()
export class AppConfig {}