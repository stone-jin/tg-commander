#!/usr/bin/env node
import commander from 'commander';
import 'reflect-metadata';

export interface CommandOptions{
    cmd: string;
    description?: string;
    alias?: string;
}

interface ExCommandOptions{
    cmd: string;
    description?: string;
    fn: any;
}

export function Command(hello: string | CommandOptions){
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        let original = descriptor.value;
        const args = Reflect.getMetadata("Command", target) || [];
        if(typeof hello === 'string'){
            const result: ExCommandOptions = {
                cmd: hello,
                fn: original
            }
            Reflect.defineMetadata("Command", [...args, result], target);
        }else{
            let result: ExCommandOptions = {cmd: '', fn: original};
            result = Object.assign(result, hello);
            Reflect.defineMetadata("Command", [...args, result], target);
        }
}}

export function TgCommand(constructor: any){
    let instance = null;
    if(Reflect.getMetadata("instance", constructor.prototype)){
        instance = Reflect.getMetadata("instance", constructor.prototype)
    }else{
        instance = new constructor();
    }
    const options: TgOption[] = Reflect.getMetadata("tgOptions", constructor.prototype);
    for(const option of options){
        if(option.name.indexOf("[") >=0){
            commander.option(option.name, option.description, (arg1: any, arg2: any)=>{
                instance[option.to] = arg1
            });
            instance[option.to] = option.defaultValue;
        }else{
            let result = /\-\-(\w+)/.exec(option.name);
            commander.option(option.name, option.description, (v, total)=>{
                console.log("-----")
                console.log(total);
                console.log(commander.online)
            }, option.defaultValue);
            instance[option.to] = commander[result[1]];
        }
    }
    const commands: ExCommandOptions[] = Reflect.getMetadata("Command", constructor.prototype);
    for(const command of commands){
        commander.command(command.cmd).action(command.fn.bind(instance)).description(command.description)
    }
    commander.parse(process.argv)
}

export interface TgOption{
    name: string;
    description: string;
    to: string;
    defaultValue?:any;
}

export function TgOptions(name:string, description: string, defaultValue?: any){
    return (target, propertyKey: string)=>{
        let options = Reflect.getMetadata("tgOptions", target) || [];
        let option: TgOption = {
            name,
            description,
            to: propertyKey,
            defaultValue
        }
        Reflect.defineMetadata("tgOptions", [...options, option], target);
}}
