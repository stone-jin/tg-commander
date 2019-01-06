#!/usr/bin/env node

import { Command, TgCommand, TgOptions } from "../lib";

@TgCommand
class Hello {

    @TgOptions("-p, --peppers [type]", "Add peppers")
    public type: string;

    @TgOptions("-t, --target [taget]", "Add peppers", "dev")
    public target: string;

    @Command("rmdir <cmd> [env]")
    public hello(cmd: any, env: any) {
        console.log(cmd, env);
    }

    @Command({
        cmd: "g <module>",
        description: "create module",
    })
    public createModule(module: any) {
        const self: any = this;
        console.log(this.type);
        console.log("you want to create module: " + module);
        console.log(this.target);
        console.log("====");
    }

    @Command({
        cmd: "n <product>",
        description: "new product",
    })
    public newProduct(product: string) {
        console.log("you want to create product: " + product);
    }
}
