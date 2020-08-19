import * as React from 'react'
import { useState, createContext } from 'react'
import Test from './test'
import TestButton from './test-button'

export default (props:any) => {
    const [state, setState] = useState<any>({})
    const addState = (key:string, value:any) => {
        let newState = state
        newState[key] = value
        setState(newState)
    }
    const [setFunctions, setSetFunctions] = useState<any>({})
    const addSetFunction = (key:string, fn:any) => {
        let newSet = setFunctions
        newSet[key] = fn
        setSetFunctions(newSet)
    }
    const Provider:any = createContext({
        states: state,
        addState: addState,
        addSetFunction: setSetFunctions
    })
    
    return(
      <Provider.Provider>
        <TestButton />
        <Test/>
      </Provider.Provider>
    )
}