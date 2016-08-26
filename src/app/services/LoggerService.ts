import {Component} from "@sklechko/framework";

@Component()
export class LoggerService {

    logSave(): void {
        console.log('Saving model in database!');
    }

    logRead(): void {
        console.log('Reading from database!');
    }

    logDeleteBefore(): void {
        console.log('Deleting entry from the database!');
    }

    logDeleteAfter(): void {
        console.log('Entry deleted from the deleted!')
    }
}