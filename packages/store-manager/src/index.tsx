export interface IDict{
    [propNames: string]: any
}
type IKey = string|string[]|null
export function checkStorage(tableName: string, storeFunc:Storage, key:IKey=null):boolean{
    try{
        let storage: string|null = storeFunc.getItem(tableName)
        if (storage===null || storage==='') return false
        if (key instanceof Array){
            let table = JSON.parse(storage)
            for (let index in key){
                if (table[key[index]]===undefined) return false
            }
        }
        else if (key!==null){
            let table = JSON.parse(storage)
            if (table[key]===undefined) return false
        }
        
    }
    catch(err){
        console.log(err)
        return false
    }
    return true
}

export function checkSession(tableName: string, key:IKey=null):boolean{
    return checkStorage(tableName, sessionStorage, key)
}

export function checkLocal(tableName: string, key: IKey=null): boolean{
    return checkStorage(tableName, localStorage, key)
}

export function createStorage(tableName:string, storeFunc: Storage, store:IDict={}):boolean{
    return writeStorage(tableName, store, storeFunc)
}

export function readStorage(tableName:string, 
                            storeFunc: Storage, 
                            key:IKey=null, 
                            checkKey:IKey=null,
                            store:IDict={},
                            create:boolean=true):any|null{
    try{
        if (create){
            let isExist:boolean = checkStorage(tableName, storeFunc, checkKey)
            if (!isExist) createStorage(tableName, storeFunc, store)
        }
        if (key===null){
            let tableString: string|null = storeFunc.getItem(tableName)
            let table: IDict = JSON.parse(tableString as string)
            return table
        }
        else if (key instanceof Array){
            let tableString: string|null = storeFunc.getItem(tableName)
            let table: IDict = JSON.parse(tableString as string)
            let ret: IDict = {}
            for (let k of key){
                if(table[k]===undefined) return null
                ret[k] = table[k]
            }
            return ret
        }
        else{
            let tableString: string|null = storeFunc.getItem(tableName)
            let table: IDict = JSON.parse(tableString as string)
            if (table[key] === undefined) return null
            return table[key]
        }
    }
    catch(err){
        console.log(err)
        return null
    }
}


export function updateStorage(  tableName:string,
                                table: IDict,
                                storeFunc: Storage, 
                                checkKey:IKey=null,
                                store:IDict={},
                                create:boolean=true):boolean{
    try{
        const old = readStorage(tableName, 
                            storeFunc,
                            null,
                            checkKey,
                            store,
                            create)
        const _new = Object.assign(old, table)
        console.log(old, _new, 'update')
        writeStorage(tableName, _new, storeFunc)
        return true
    }
    catch (err){
        console.log(err)
        return false
    }
}

export function writeStorage(   tableName:string, 
                                table:IDict, 
                                storeFunc: Storage): boolean{
    try{
        let tableString: string = JSON.stringify(table)
        storeFunc.setItem(tableName, tableString)
        return true
    }
    catch(err){
        console.log(err)
        return false
    }

}

export function createSession(
    tableName:string,
    store:IDict={}):boolean{
    return createStorage(tableName, sessionStorage, store)
}

export function createLocal(
    tableName:string,
    store:IDict={}):boolean{
    return createStorage(tableName, localStorage, store)
}

export function readSession(
    tableName:string,
    key: IKey=null,
    checkKey: IKey=null,
    store:IDict={},
    create:boolean=true):any|null{
    return readStorage(
        tableName, 
        sessionStorage, 
        key, 
        checkKey, 
        store, 
        create)
}

export function readLocal(
    tableName:string,
    key:IKey=null,
    checkKey: IKey=null,
    store:IDict={},
    create:boolean=true):any|null{
    return readStorage(
        tableName, 
        localStorage, 
        key, 
        checkKey, 
        store, 
        create)
}

export function updateSession(
    tableName:string,
    table: IDict,
    checkKey:IKey=null,
    store:IDict={},
    create:boolean=true):boolean{
    return updateStorage(
        tableName,
        table,
        sessionStorage,
        checkKey,
        store,
        create
    )
}

export function updateLocal(
    tableName:string,
    table: IDict,
    checkKey:IKey=null,
    store:IDict={},
    create:boolean=true):boolean{
    return updateStorage(
        tableName,
        table,
        localStorage,
        checkKey,
        store,
        create
    )
}

export function writeSession(tableName: string, table: IDict):boolean{
    return writeStorage(tableName, table, sessionStorage)
}

export function writeLocal(tableName: string, table: IDict):boolean{
    return writeStorage(tableName, table, localStorage)
}

export class StoreManager{
    private structure: IDict
    private tableName: string
    constructor(tableName:string, structure:IDict={}){
        this.tableName = tableName
        this.structure = structure
    }
    checkSession():boolean{
        return checkSession(this.tableName, this.structure.keys)
    }
    checkLocal(): boolean{
        return checkLocal(this.tableName, this.structure.keys)
    }
    createSession(): boolean{
        return createSession(this.tableName, this.structure)    
    }
    createLocal(): boolean{
        return createLocal(this.tableName, this.structure)

    }
    readSession(
        key:IKey=null, 
        create:boolean=true):any|null{
        return readSession(this.tableName, key,
            this.structure.keys, this.structure, create)
    }
    readLocal(
        key:IKey=null,
        create:boolean=true):any|null{
        return readLocal(this.tableName, key,
            this.structure.keys, this.structure, create)

    }
    updateSession(
        table:IDict, 
        create:boolean=true):boolean{
        return updateSession(this.tableName,
            table, Object.keys(this.structure), 
            this.structure, create)
    }
    updateLocal(
        table:IDict,
        create:boolean=true):boolean{
        return updateLocal(this.tableName,
            table, Object.keys(this.structure),
            this.structure, create)

    }
    checkStruct(table:IDict):boolean{
        const keys = Object.keys(this.structure)
        for (let k of keys){
            if (table[k]===undefined) return false
        }
        return true
    }
    writeSession(table:IDict, force:boolean=false):boolean{
        if (force) return writeSession(this.tableName, table)
        else{
            const succeed = this.checkStruct(table)
            if (succeed) return writeSession(this.tableName, table)
            else return false
        }
    }
    writeLocal(table:IDict, force:boolean=false):boolean{
        if (force) return writeLocal(this.tableName, table)
        else{
            const succeed = this.checkStruct(table)
            if (succeed) return writeLocal(this.tableName, table)
            else return false
        }
    }
}