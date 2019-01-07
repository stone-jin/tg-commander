import { InjectManager } from "../manange/inject-manage";
import { FunctionReflectUtils } from "../utils/function-reflect-utils";
import { IocUtils } from "../utils/ioc-utils";
import { ParamsUtils } from "../utils/params-utils";

export function TgService(cls: any) {
    const paramTypes = FunctionReflectUtils.getFunctionTypes(cls);
    const paramNames = ParamsUtils.getConstructorParamList(cls);
    if (paramTypes) {
        for (let i = 0; i < paramTypes.length; i++) {
            if (!paramTypes[i]) {
                console.error(`${cls.name}构造函数中的${paramNames[i]} 不能被注入,
                    因为${paramNames[i]} 类型的构造函数中又注入了${cls.name}的成员`);
                process.exit(-1);
            }
        }
    }
    const params = IocUtils.iocInject(cls, paramNames, paramTypes);
    const instance: any = Reflect.construct(cls, params);
    InjectManager.getInstance().setType(cls, instance);

    cls.instance = instance;
    cls.getInstance = () => {
        return instance;
    };
    cls.schedule = cls.prototype.schedule;
}
