import * as React from 'react'
import { useState } from 'react'
import { stateManager } from '../index'
import Async from './use-async'

export default (props:any)=>{
    const id = 'async'
    const [hello, setHello] = useState('Hello')
    stateManager.addState(id, 'hello', hello)
    stateManager.addFunction(id, 'setHello', setHello)
    console.log('added', stateManager.getStore())
    return (
        <>
            <Async/>
            <div>{hello}</div>
        </>
    )
}