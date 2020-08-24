
import React from 'react'
import { stateManager } from '../index'
import Hello from './state'

export default (props:any) => {

    function onClick(){
        const hello = stateManager.getState('hello', 'hello')
        const setHello = stateManager.getFunction('hello', 'setHello')
        setHello(hello+'!')
    }
    return (
        <div>
            <button test-id='test-button' onClick={onClick}>click me</button>
            <Hello test-id='test-hello'/>
        </div>
    )
}