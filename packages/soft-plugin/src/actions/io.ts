import { stateManager } from '@wangziling100/state-manager'
export function setData(
id:string, 
stateKey:string,
functionKey:string,
value:any=null,
fn:Function|null=null
):boolean{
    try{
        let state, setState
        if(value!==null){
            state = value
        }
        else{
            state = stateManager.getState(id, stateKey)
        }
        if (fn!==null){
            setState=fn
        }
        else{
            setState = stateManager.getFunction(id, functionKey)
        }
        setState(state)
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}