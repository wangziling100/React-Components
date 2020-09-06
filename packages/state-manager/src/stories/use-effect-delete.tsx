import * as React from 'react'
import { useState } from 'react'
import {stateManager} from '../index'
import { useSession } from '../lib/effect'

export default (props:any) => {
    const id = 'hello'
    useSession(id) 
    const [hello, setHello] = useState('Hello')
    const [hi, setHi] = useState('Hi')

    stateManager.addFunction(id, 'setHello', setHello)
    stateManager.addState(id, 'hello', hello)
    stateManager.addFunction(id, 'hi', setHi)
    stateManager.addState(id, 'hi', hi)
    console.log(stateManager.getStore(), 'store')
    stateManager.addToSessionSet(id, 'ALL')
    stateManager.addToLocalSet(id, ['hi'])

    return(
        <>
            <div> {hello} </div>
            <div> {hi} </div>
        </>
    )
}