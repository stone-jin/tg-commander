#!/usr/bin/env node

import { TgApp, TgModule } from "../lib";
import { BaseApp } from "../lib/base";
import { HelloCommand } from "./test";

@TgModule({
    commands: [HelloCommand],
})
export class AppModule {

}

@TgApp({
    imports: [AppModule],
})
export class MainApp extends BaseApp {

}

MainApp.boostrap();
