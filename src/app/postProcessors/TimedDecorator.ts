const TIMED_SYMBOL = Symbol('TIMED_SYMBOL');
export function TimedDecorator() {
    return function (target, method) {
        target[TIMED_SYMBOL] = true;
    };
}

export class TimedDecoratorUtil {

    static isTimedDecoratorApplied(target) {
        return target[TIMED_SYMBOL] || false;
    }
}