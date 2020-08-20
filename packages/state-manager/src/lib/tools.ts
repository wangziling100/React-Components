interface IStates{
    [propName: string]: any;
}
interface IFunctions{
    [propName: string]: any;
}
interface IAllState{
    [propName: string]: IStates;
}
interface IAllFunction{
    [propName: string]: IFunctions;
}
export interface IStore{
    state: IAllState; 
    function: IAllFunction; 
}
export class StateManager {
    private store:IStore;
    private updateFunction:any;
    constructor(store: IStore|void){
        if (store===undefined){
            this.store = {
                state: {},
                function: {}
            }
        }
        else{
            this.store = store as IStore
        }
        
    }
    getStore():IStore{
        return this.store
    }
    addState(id:string, key:string, value:any){
        if(this.store.state[id]===undefined){
            this.store.state[id] = {}
        }
        this.store.state[id][key] = value
    }
    addFunction(id:string, key:string, value:any){
        if(this.store.function[id]===undefined){
            this.store.function[id] = {}
        }
        this.store.function[id][key] = value
    }
    setUpdateFunction(fn:any){
        this.updateFunction = fn
    }
    update(){
        this.updateFunction(this.store)
    }

    getFunction(id:string, key:string){
        return this.store.function[id][key]
    }
    getState(id:string, key:string){
        return this.store.state[id][key]
    }
}
