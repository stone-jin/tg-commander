import commander from "commander";
import "reflect-metadata";

export class BaseApp {
    public static boostrap() {
        const result = Reflect.getMetadata("config", this);
        commander.parse(process.argv);
    }
}
