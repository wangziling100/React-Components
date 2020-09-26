import { stateManager } from '@wangziling100/state-manager'

export function setVisible(
signal:string,
id:string, 
stateKey:string,
stateValue:any, 
functionKey:string,
functionValue:any)
:boolean{
    try{
        if (signal===undefined) return false
        stateManager.addState(id, stateKey, stateValue)
        stateManager.addFunction(id, functionKey, functionValue)
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}
