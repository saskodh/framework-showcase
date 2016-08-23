import { Configuration, PropertySource, Import } from "@sklechko/framework";
import { ControllersConfig } from "./controllers/ControllersConfig";
import { RepositoriesConfig } from "./repositories/RepositoriesConfig";
import { ServicesConfig } from "./services/ServicesConfig";
import { InterceptorsConfig } from "./interceptors/InterceptorsConfig";
import { ActiveProfiles } from "@sklechko/framework/lib/decorators/ProfileDecorators";
import { PostProcessorsConfig } from "./postProcessors/PostProcessorsConfig";

@Import(ControllersConfig, RepositoriesConfig, ServicesConfig, InterceptorsConfig, PostProcessorsConfig)
@PropertySource(__dirname + '/../resources/app.properties.json')
@ActiveProfiles('mongo')
@Configuration()
export class AppConfig {}