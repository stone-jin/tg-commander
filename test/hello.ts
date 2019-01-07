import { TgService } from "../lib/decorator/service";

@TgService
export class HelloService {
    public name: string = "nihao";
}
