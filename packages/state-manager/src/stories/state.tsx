import * as React from 'react'
import { useState } from 'react'
import {stateManager} from '../index'

export default (props:any) => {
    const id = 'hello'
    //useSession(id) 
    //const _hello = stateManager.getState(id, 'hello')
    const [hello, setHello] = useState('Hello')
    console.log(hello, 'hello here')
    stateManager.addFunction(id, 'setHello', setHello)
    stateManager.addState(id, 'hello', hello)
    stateManager.addToSessionSet(id, 'hello')
    return(
        <>
            <div> {hello} </div>
        </>
    )
}