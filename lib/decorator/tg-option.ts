import { TgOption } from "../types/tg-option.type";

export function TgOptions(name: string, description: string, defaultValue?: any) {
    return (target, propertyKey: string) => {
        const options = Reflect.getMetadata("tgOptions", target) || [];
        const option: TgOption = {
            defaultValue,
            description,
            name,
            to: propertyKey,
        };
        Reflect.defineMetadata("tgOptions", [...options, option], target);
}; }
