import * as React from 'react'
import { useState } from 'react'
import { stateManager } from '../index'
import '../css/tailwind.css'
import cn from 'classnames'

export default (props:any) => {
    const id = 'test'
    const [ visible, setVisible ] = useState(false)
    stateManager.addState(id, 'visible', visible)
    stateManager.addFunction(id, 'setVisible', setVisible)
    return(
        <div className={cn({'hidden':!visible})}>
            Hello ~~
        </div>
    )
}