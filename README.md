<p align="center"><img src="https://github.com/stone-jin/tg-commander/raw/master/assets/logo.png" alt="tg-commander logo" width="150px" height="150px"></p>

## tg-commander [![NPM version](https://img.shields.io/npm/v/tg-commander.svg?style=flat-square)](https://npmjs.com/package/tg-commander) [![NPM downloads](https://img.shields.io/npm/dm/tg-commander.svg?style=flat-square)](https://npmjs.com/package/tg-commander)

:dart: A laconic and Convenient tools for commander.

### who use tg-commander?

[Netease](https://www.163.com/)

### Use

example: [](https://github.com/stone-jin/tg-commander-template)

```bash
git clone https://github.com/stone-jin/tg-commander-template.git
npm install
ts-node ./src/index.ts g name

# publish
npm run package
cd publish && npm publish
```

let's see the code.

```typescript
import { Command, TgCommand, TgOptions } from "tg-commander";
import { HelloService } from "../service/hello";

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
        console.log(this.helloService.getName());
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
```

```bash
xxx g name
```