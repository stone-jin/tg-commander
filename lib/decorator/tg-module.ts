import { TgModuleOption } from "../types/tg-module-options.type";

export function TgModule(options: TgModuleOption) {
    // tslint:disable-next-line:no-empty
    return (constructor: any) => {
        Reflect.defineMetadata("options", options, constructor.prototype);
    };
}
