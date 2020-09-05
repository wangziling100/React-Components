import { stateManager } from '@wangziling100/state-manager'
export function notificate(
id:string, 
functionKey:string){
    try{
        const fn = stateManager.getFunction(id, functionKey)
        fn()
        return true
    }
    catch(err){
        console.log(err)
        return false
    }


}