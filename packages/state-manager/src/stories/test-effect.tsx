import * as React from 'react'
import { stateManager } from '../index'
import Hello from './use-effect'

export default (props:any) => {

    function onClick(){
        const hello = stateManager.getState('hello', 'hello')
        const setHello = stateManager.getFunction('hello', 'setHello')
        const hi = stateManager.getState('hello', 'hi')
        const setHi = stateManager.getFunction('hello', 'hi')
        setHello(hello+'!')
        setHi(hi+'~')
        stateManager.writeSession('hello')
        stateManager.writeLocal('hello')
    }
    return (
        <div>
            <button onClick={onClick}>click me</button>
            <Hello />
        </div>
    )
}