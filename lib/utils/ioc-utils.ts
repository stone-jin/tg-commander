import { InjectManager } from "../manange/inject-manage";

export class IocUtils {
    public static iocInject(constructor: () => any, params: string[], paramsTypes: any[]) {
        const result = [];
        for (let i = 0; i < params.length; i++) {
            constructor.prototype[params[i]] = InjectManager.getInstance().getType(paramsTypes[i]);
            result.push(constructor.prototype[params[i]]);
        }
        return result;
    }
}
