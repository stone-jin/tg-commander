import "reflect-metadata";
import { CommandOptions } from "../types/command-options.type";
import { ExCommandOptions } from "../types/ex-command-options.type";

export function Command(hello: string | CommandOptions) {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const original = descriptor.value;
        const args = Reflect.getMetadata("Command", target) || [];
        if (typeof hello === "string") {
            const result: ExCommandOptions = {
                cmd: hello,
                fn: original,
            };
            Reflect.defineMetadata("Command", [...args, result], target);
        } else {
            let result: ExCommandOptions = {cmd: "", fn: original};
            result = Object.assign(result, hello);
            Reflect.defineMetadata("Command", [...args, result], target);
        }
}; }
