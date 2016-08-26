import { Aspect, Before, AfterReturning, Around, Inject } from "@sklechko/framework";
import { ProceedingJoinPoint } from "@sklechko/framework/lib/decorators/AspectDecorator";
import { LoggerService } from "../services/LoggerService";

@Aspect()
export class ServiceLoggerAspect {

    @Inject()
    private loggerService: LoggerService;

    @Before({ classRegex: /Service$/, methodRegex: /^save.*$/ })
    logSaveModelToDatabase() {
        this.loggerService.logSave();
    }

    @AfterReturning({ classRegex: /Service$/, methodRegex: /^get.*$/ })
    logSuccessfulReadsFromDatabase() {
        this.loggerService.logRead();
    }

    @Around({ classRegex: /Service$/, methodRegex: 'delete' })
    logDeletesFromDatabase(proceedingJoinPoint: ProceedingJoinPoint) {
        this.loggerService.logDeleteBefore();
        let result = proceedingJoinPoint.proceed();
        this.loggerService.logDeleteAfter();
        return result;
    }
}