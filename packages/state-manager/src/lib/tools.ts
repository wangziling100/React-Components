import { StoreManager } from '@wangziling100/store-manager'
import { IKey, IDict } from './types'

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
    private localKeys: IDict = {};
    private sessionKeys: IDict = {};
    private storeManagers: IDict = {};
    private loadFunctions: IDict = {};
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
        if(this.store.state[id]===undefined
        || this.store.state[id]===null){
            this.store.state[id] = {}
        }
        this.store.state[id][key] = value
    }

    addFunction(id:string, key:string, value:any){
        if(this.store.function[id]===undefined
        || this.store.function[id]===null){
            this.store.function[id] = {}
        }
        this.store.function[id][key] = value
    }

    addTo(id:string|string[], key:IKey=null, func:string|null=null, storage:string):boolean{
        try{
            let store: IDict
            if (storage==='local') {
                store = this.localKeys
            }
            else if(storage==='session'){
                store = this.sessionKeys
            }
            else return false

            if (id === 'ALL'){
                store['ALL'] = {}
            }
            else if (id instanceof Array){
                for (let el of id){
                    if (store[el]===undefined) {
                        store[el]={}
                    }
                    store[el]['all'] = ''
                }
            }
            else if (key === 'ALL'){
                if(store[id]===undefined){
                    store[id] = {}
                }
                store[id]['all'] = ''
            }
            else if (key instanceof Array){
                if(store[id]===undefined){
                    store[id] = {}
                }
                for (let k of key){
                    store[id][k] = this.getState(id, k)
                }
            }
            else if(key===null){
                console.log('stored key is set as null')
                return false
            }
            else{
                if(store[id]===undefined) store[id] = {}
                store[id][key] = this.getState(id, key)
                //关联state和setState
                if (func!==null){
                    if (this.loadFunctions[id]===undefined){
                        this.loadFunctions[id] = {}
                    }
                    this.loadFunctions[id][key] = func
                }
            }
            return true
        }
        catch (err){
            console.log(err)
            return false
        }
        
        
    }

    addToSessionSet(id:string|string[], 
    key:IKey=null, 
    func:string|null=null):boolean{

        return this.addTo(id, key, func, 'session')
    }

    addToLocalSet(id:string|string[], 
    key:IKey=null, 
    func:string|null=null):boolean{

        return this.addTo(id, key, func, 'local')
    }

    writeStorage(storage:string, id:IKey=null):boolean{
        try{
            let storeKeys: IDict
            let store: IDict = {}
            if (storage==='session') storeKeys = this.sessionKeys
            else if (storage==='local') storeKeys = this.localKeys
            else return false

            if (id===null){
                if(storeKeys['ALL']!==undefined){
                    store = this.store.state
                }
                else{
                    for (let index in storeKeys){
                        const table = storeKeys[index]
                        if(table['all']!==undefined){
                            store[index] = this.store.state[index]
                        }
                        else{
                            store[index] = table
                        }
                    }
                }
            }
            else if(id instanceof Array){
                for (let index in id){
                    const _id = id[index]
                    const table = storeKeys[_id]
                    if(table['all']!==undefined){
                        store[_id] = this.store.state[_id]
                    }
                    else{
                        store[_id] = table
                    }
                }

            }
            else{
                const table = storeKeys[id]
                if(table['all']!==undefined){
                    store[id] = this.store.state[id]
                }
                else{
                    store[id] = table
                }
            }
            // 也写入setFunc的索引
            store = this.appendFunc(store)
            for (let tableName in store){
                if(this.storeManagers[tableName]===undefined){
                    const manager = new StoreManager(tableName)
                    this.storeManagers[tableName] = manager
                }
                const manager = this.storeManagers[tableName]
                const table = store[tableName]
                if (storage==='local'){
                    const succeed = manager.updateLocal(table)
                    if (!succeed) return false
                }
                else if (storage==='session'){
                    const succeed = manager.updateSession(table)
                    if (!succeed) return false
                }
            }
            return true
        }
        catch (err){
            console.log(err)
            return false
        }
        
    }

    appendFunc(store:IDict):IDict{
        const tables = Object.keys(store)
        for (let table of tables){
            if(this.loadFunctions[table]===undefined){
                continue
            }
            if(store[table+'@func']===undefined){
                store[table+'@func'] = {}
            }
            store[table+'@func'] = this.loadFunctions[table]
        }
        return store
    }

    writeSession(id:string|string[], delay:number=0):NodeJS.Timeout{
        return setTimeout(()=>{
            const succeed = this.writeStorage('session', id)
            if(!succeed) console.log('Writing sessionStorage is failed')
        }, delay ) 
    }

    writeLocal(id:string|string[], delay:number=0):NodeJS.Timeout{
        return setTimeout(()=>{
            const succeed = this.writeStorage('local', id)
            if(!succeed) console.log('Writing localStorage is failed')
        }, delay )
    }

    loadStorage(id:string|string[], storage:string):boolean{
        try{
            let succeed = true
            if (id instanceof Array){
                for (let tableName of id){
                    if(this.storeManagers[tableName]===undefined){
                        succeed = false
                        continue
                    }
                    const manager = this.storeManagers[tableName]
                    const funcManager = this.getManager(tableName+'@func')
                    if (storage==='local'){
                        const tmp = manager.readLocal()
                        const resetFunctions = funcManager.readSession()
                        if (tmp===null||tmp===undefined) continue
                        this.store.state[tableName] = Object.assign(this.store.state[tableName], tmp)
                        this.resetState(tableName, tmp, resetFunctions)
                    }
                    else if (storage==='session'){
                        const tmp = manager.readSession()
                        const resetFunctions = funcManager.readSession()
                        if (tmp===null||tmp===undefined) continue
                        this.store.state[tableName] = Object.assign(this.store.state[tableName], tmp)
                        this.resetState(tableName, tmp, resetFunctions)
                    }
                    else return false
                }
            }
            else{
                const tableName = id
                const manager = this.getManager(tableName)
                const funcManager = this.getManager(tableName+'@func')
                if (storage==='local'){
                    const tmp = manager.readLocal()
                    const resetFunctions = funcManager.readSession()
                    if (tmp!==null&&tmp!==undefined){
                        this.store.state[tableName] = Object.assign(this.store.state[tableName], tmp)
                        this.resetState(tableName, tmp, resetFunctions)
                    } 
                }
                else if (storage==='session'){
                    const tmp = manager.readSession()
                    const resetFunctions = funcManager.readSession()
                    if (tmp!==null&&tmp!==undefined){
                        this.store.state[tableName] = Object.assign(this.store.state[tableName], tmp)
                        this.resetState(tableName, tmp, resetFunctions)
                    }
                }
                else return false
            }
            return succeed
        }
        catch(err){
            console.log(err)
            return false
        }
    }

    resetState(id:string, newData:IDict, functions:IDict){
        for (let key in newData){
            try{

                if(functions===undefined
                || functions===null
                || functions[key]===undefined
                || functions[key]===null){
                    if(this.store.function[id][key]!==undefined){
                        const func = this.store.function[id][key]
                        const value = newData[key]
                        func(value)
                    }
                    else if(this.store.function[id]['set'+this.firstUpperCase(key)]!==undefined){
                        const func = this.store.function[id]['set'+this.firstUpperCase(key)]
                        const value = newData[key]
                        func(value)
                    }
                }
                else{
                    const funcName = functions[key]
                    const func = this.store.function[id][funcName]
                    const value = newData[key]
                    func(value)
                }
            }
            catch(err){
                console.log(err)
            }
        }

    }
    firstUpperCase(str:string){
        return str[0].toUpperCase()+str.slice(1)
    }

    loadLocal(id:string|string[]):boolean{
        return this.loadStorage(id, 'local')
    }

    loadSession(id:string|string[]):boolean{
        return this.loadStorage(id, 'session')
    }

    setUpdateFunction(fn:any){
        this.updateFunction = fn
    }

    update(){
        this.updateFunction(this.store)
    }

    getFunction(id:string, key:string){
        if(this.store.function[id]===undefined 
        || this.store.function[id][key]===undefined){
            return null
        }
        return this.store.function[id][key]
    }

    getState(id:string, key:string){
        if(this.store.state[id]===undefined 
        || this.store.state[id][key]===undefined){
            return null 
        }
        return this.store.state[id][key]
    }
    getManager(id:string){
        if (this.storeManagers[id]===undefined){
            this.storeManagers[id] = new StoreManager(id)
        }
        return this.storeManagers[id]
    }
}