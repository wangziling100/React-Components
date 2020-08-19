import * as React from 'react'
import { stateManager } from '../index'

export default (props: any) => {
    const onClick = () => {
        const visible = stateManager.getState('test', 'visible')
        const setVisible = stateManager.getFunction('test', 'setVisible')
        setVisible(!visible)
    }
    return(
        <>
          <button onClick={onClick}>Click me</button>
        </>
    )
}