#!/usr/bin/env node

import { TgCommand, TgOptions, Command } from "../lib";

@TgCommand
class Hello{

    @TgOptions('-p, --peppers [type]', 'Add peppers')
    type: string;

    @TgOptions('-t, --target [taget]', 'Add peppers', 'dev')
    target: string;

    @Command("rmdir <cmd> [env]")
    hello(cmd: any, env: any){
        console.log(cmd, env);
    }

    @Command({
        cmd: "g <module>",
        description: 'create module'
    })
    createModule(module: any){
        let self:any = this;
        console.log(this.type);
        console.log("you want to create module: " + module);
        console.log(this.target);
        console.log("====")
    }
}
