import {Configuration, ComponentScan} from "@sklechko/framework";

@ComponentScan(__dirname)
@Configuration()
export class InterceptorsConfig {}