export class InjectManager {
    // tslint:disable-next-line:variable-name
    public static _instance: InjectManager;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new InjectManager();
        }
        return this._instance;
    }
    public maps: Map<any, any> = new Map<any, any>();
    public getType(key: any) {
        if (!this.maps.get(key)) {
            this.maps.set(key, new key());
        }
        return this.maps.get(key);
    }

    public setType(key: any, value: any) {
        this.maps.set(key, value);
    }
}
