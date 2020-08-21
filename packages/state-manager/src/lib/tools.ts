import { useEffect } from 'react'


interface IDict{
    [propName: string]: any;
}
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
    private storageKeys: IDict = {};
    private sessionKeys: IDict = {};
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

    addTo(id:string, key:string|string[], where:'session'|'local'){
        try{
            let storeFunc: Storage
            if (where==='session') storeFunc = sessionStorage
            else if (where==='local') storeFunc = localStorage

            if (id === 'ALL'){
                const newKey = id+'_'+key
                const store = this.store.state
                this.sessionKeys['ALL'] = []
            }
            else if (key === 'ALL'){
                const newKey = id+'_'+key
                const store = this.store.state[id]
                this.sessionKeys[id] = ['all']
            }
            else if (key instanceof Array){
                let store:IDict = {}
                for (let index in key){
                    store[id] = key[index]
                    const newKey = id+'_'+key[index]
                    this.sessionKeys[newKey] = [id, key[index]]
                }
            }
            else{
                const newKey = id+'_'+key
                const store = this.store.state[id][key]
                this.sessionKeys[newKey] = [id, key]
            }
        }
        catch (err){
            console.log(err)
        }
        
        
    }
    addToSession(id:string, key:string){
        this.addTo(id, key, 'session')
    }

    addToStorage(id:string, key:string){
        this.addTo(id, key, 'local')
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