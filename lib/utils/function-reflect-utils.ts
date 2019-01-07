
export class FunctionReflectUtils {
    public static getFunctionTypes(constructor: () => any): any[] {
        const paramsTypes = Reflect.getMetadata("design:paramtypes", constructor);
        return paramsTypes;
    }
}
