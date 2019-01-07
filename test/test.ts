#!/usr/bin/env node

import { Command, TgCommand, TgOptions } from "../lib";
import { HelloService } from "./hello";

@TgCommand
export class HelloCommand {

    @TgOptions("-p, --peppers [type]", "Add peppers")
    public type: string;

    @TgOptions("-t, --target [taget]", "Add peppers", "dev")
    public target: string;

    constructor(private helloService: HelloService) {

    }

    @Command("rmdir <cmd> [env]")
    public hello(cmd: any, env: any) {
        console.log(cmd, env);
        console.log(this.helloService.name);
    }

    @Command({
        cmd: "g <module>",
        description: "create module",
    })
    public createModule(module: any) {
        console.log(this.type);
        console.log("you want to create module: " + module);
        console.log(this.target);
        console.log("====");
    }

    @Command({
        cmd: "new <product>",
        alias: "n",
        description: "new product",
    })
    public newProduct(product: string) {
        console.log(process.cwd());
        console.log("you want to create product: " + product);
    }
}
