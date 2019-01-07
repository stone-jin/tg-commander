import { TgAppOption } from "../types/tg-app-options.type";

export function TgApp(config: TgAppOption) {
    return (constructor: any) => {
        Reflect.defineMetadata("config", config, constructor.prototype);
    };
}
