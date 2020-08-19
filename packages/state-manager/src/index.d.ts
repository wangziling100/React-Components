import { IStore } from './lib/tools'
declare function ManageState(props:any):JSX.Element;
declare class StateManager{
    constructor(store:IStore|void);
    getStore():IStore;
    addState(id:string, key:string, value:any):void;
    addFunction(id:string, key:string, value:any):void;
    setUpdateFunction(fn:any):any;
    update():void;
    getFunction(id:string, key:string):any;
    getState(id:string, key:string):void;
}
declare let stateManager: StateManager;

export {StateManager, stateManager};
export default ManageState;

