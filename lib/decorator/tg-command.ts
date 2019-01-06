import commander from "commander";
import { ExCommandOptions } from "../types/ex-command-options.type";
import { TgOption } from "../types/tg-option.type";

export function TgCommand(constructor: any) {
    let instance = null;
    if (Reflect.getMetadata("instance", constructor.prototype)) {
        instance = Reflect.getMetadata("instance", constructor.prototype);
    } else {
        instance = new constructor();
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
                console.log("-----");
                console.log(total);
                console.log(commander.online);
            }, option.defaultValue);
            instance[option.to] = commander[result[1]];
        }
    }
    const commands: ExCommandOptions[] = Reflect.getMetadata("Command", constructor.prototype);
    for (const command of commands) {
        commander.command(command.cmd).action(command.fn.bind(instance)).description(command.description);
    }
    commander.parse(process.argv);
}
