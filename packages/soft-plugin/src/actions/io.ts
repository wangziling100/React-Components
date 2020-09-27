import { stateManager } from '@wangziling100/state-manager'
// 设置目标组件的数据
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
//获取所有组件的数据
export function getAllData(
id: string,
): any{
    try{
        const allData = stateManager.getStore().state[id]
        console.log(stateManager.getStore().state)
        console.log(allData, 'get all data')
        return allData
    }
    catch(err){
        return null
    }
}