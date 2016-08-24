const TIMED_SYMBOL = Symbol('TIMED_SYMBOL');
export function Timed() {
    return function (target, method) {
        target[TIMED_SYMBOL] = true;
    };
}

export class TimedUtil {

    static isTimedApplied(target) {
        return target[TIMED_SYMBOL] || false;
    }
}