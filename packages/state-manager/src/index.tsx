import { useState, createContext } from 'react';
import * as React from 'react';
import { StateManager } from './lib/tools'

export let stateManager = new StateManager()

export function ManageState(props:any){
    const [state, setState] = useState()
    stateManager.setUpdateFunction(setState)
    const myProvider:any = createContext('')
    return(
        <myProvider.Provider >
            {props.children}
        </myProvider.Provider>
    )
}
export default ManageState