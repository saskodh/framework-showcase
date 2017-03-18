import { Configuration, PropertySource, Import, EnableCaching } from "@sklechko/framework";
import { ControllersConfig } from "./controllers/ControllersConfig";
import { RepositoriesConfig } from "./repositories/RepositoriesConfig";
import { ServicesConfig } from "./services/ServicesConfig";
import { InterceptorsConfig } from "./interceptors/InterceptorsConfig";
import { ActiveProfiles } from "@sklechko/framework/lib/decorators/ProfileDecorators";
import { PostProcessorsConfig } from "./postProcessors/timed/PostProcessorsConfig";
import { AspectsConfig } from "./aspects/AspectsConfig";

@Import(ControllersConfig, RepositoriesConfig, ServicesConfig, InterceptorsConfig, PostProcessorsConfig, AspectsConfig)
@PropertySource(__dirname + '/../resources/app.properties.json')
@EnableCaching()
@ActiveProfiles('mongo')
@Configuration()
export class AppConfig {}