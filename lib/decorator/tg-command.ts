import commander from "commander";
import { ExCommandOptions } from "../types/ex-command-options.type";
import { TgOption } from "../types/tg-option.type";
import { FunctionReflectUtils } from "../utils/function-reflect-utils";
import { IocUtils } from "../utils/ioc-utils";
import { ParamsUtils } from "../utils/params-utils";

export function TgCommand(constructor: any) {
    let instance = null;
    if (Reflect.getMetadata("instance", constructor.prototype)) {
        instance = Reflect.getMetadata("instance", constructor.prototype);
    } else {
        const paramTypes = FunctionReflectUtils.getFunctionTypes(constructor);
        const paramNames = ParamsUtils.getConstructorParamList(constructor);
        if (paramTypes) {
            for (let i = 0; i < paramTypes.length; i++) {
                if (!paramTypes[i]) {
                    console.error(`${constructor.name}构造函数中的${paramNames[i]} 不能被注入,
                        因为${paramNames[i]} 类型的构造函数中又注入了${constructor.name}的成员`);
                    process.exit(-1);
                }
            }
        }
        const params = IocUtils.iocInject(constructor, paramNames, paramTypes);
        instance = Reflect.construct(constructor, params);
        Reflect.defineMetadata("instance", instance, constructor.prototype);
    }
    const options: TgOption[] = Reflect.getMetadata("tgOptions", constructor.prototype);
    for (const option of options) {
        if (option.name.indexOf("[") >= 0) {
            commander.option(option.name, option.description, (arg1: any, arg2: any) => {
                instance[option.to] = arg1;
            });
            instance[option.to] = option.defaultValue;
        } else {
            const result = /\-\-(\w+)/.exec(option.name);
            commander.option(option.name, option.description, (v, total) => {
                console.log(commander.online);
            }, option.defaultValue);
            instance[option.to] = commander[result[1]];
        }
    }
    const commands: ExCommandOptions[] = Reflect.getMetadata("Command", constructor.prototype);
    for (const command of commands) {
        let result = commander.command(command.cmd).action(command.fn.bind(instance));
        if (command.alias && command.alias.length > 0) {
            result = result.alias(command.alias);
        }
        if (command.description && command.description.length > 0) {
            result.description(command.description);
        }
    }
    commander.parse(process.argv);
}
