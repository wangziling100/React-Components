import { storageName, IStorageObj } from './types'
import { IConfig } from '../types'
import * as yaml from 'js-yaml'

export function readConfig(yamlFile:string): IConfig|null{
    try{
        console.log(yamlFile)
        const doc = yaml.safeLoad(yamlFile);
        console.log(doc)
        return objToConfig(doc)
    }
    catch(err){
        console.log(err)
        return null
    }
}

export function readConfigWithErrMessage(yamlFile:string): IConfig|string{
    try{
        console.log(yamlFile)
        const doc = yaml.safeLoad(yamlFile);
        console.log(doc)
        return objToConfig(doc)
    }
    catch(err){
        console.log(err)
        return err.message
    }
}

function objToConfig(obj:any){
    const ret:IConfig = {
        name: obj.name,
        lines: obj.lines
    }
    return ret
}