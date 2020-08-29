import { stateManager } from '@wangziling100/state-manager'

export function change(
id:string, 
stateKey:string,
functionKey:string,
delay:number=0)
:boolean{
    try{
        const state:boolean = stateManager.getState(id, stateKey)
        const setState = stateManager.getFunction(id, functionKey)
        setState(!state)
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
    
}

export function turnOn(
id:string, 
functionKey:string)
:boolean{
    try{
        const setState = stateManager.getFunction(id, functionKey)
        setState(true)
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}

export function turnOff(
id: string,
functionKey:string)
:boolean{
    try{
        const setState = stateManager.getFunction(id, functionKey)
        setState(false)
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}