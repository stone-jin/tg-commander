
export class ParamsUtils {
    public static getConstructorParamList(constructor: () => any): string[] {
        const functionString = constructor.toString();
        if (functionString.indexOf("class") >= 0) {
            if (functionString.indexOf("constructor(") < 0) {
                return [];
            }
            const startTime = functionString.indexOf("constructor(") + "constructor(".length;
            const endString = functionString.substring(startTime);
            const params = endString.substring(0, functionString.substring(startTime).indexOf(")")).split(",");
            let result: string[] = [];
            if (params.length === 1 && params[0].length === 0) {
                result = [];
            } else {
                result = params.map((item: string) => {
                    return item.trim();
                });
            }
            return result;
        } else {
            const args: any[] = functionString.match(/^[^\(]*\(\s*([^\)]*)\)/m) as any[];
            let result = [];
            if (args[1].split(",").length === 1 && args[1].split(",")[0].length === 0) {
                result = [];
            } else {
                result = args[1].split(",");
            }
            result = result.map((item: string) => {
                return item.trim();
            });
            return result;
        }
    }
}
