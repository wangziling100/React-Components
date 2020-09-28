import * as React from 'react'
import { useState } from 'react'
import { Button } from 'antd'
import cn from 'classnames'
import { IDict } from '../types'
import { dataMapAction, copy, extractEvents, strToBoolean } from '../lib/tools'
import { stateManager } from '@wangziling100/state-manager'


export default (props: IDict) => {
    const css = props.css || []
    const name = props.name
    const id = props.field
    const saveString:string = props.save
    const save = strToBoolean(saveString, false)
    let childProps = copy(props)
    childProps = extractEvents(childProps).props

    // State
    const [ content, setContent] = useState(props.content)

    // Init
    if (name!==undefined && save){
        stateManager.addState(id, name, content)
        stateManager.addFunction(id, name, setContent)
    }

    // Function
    function onClick(e:React.MouseEvent<HTMLButtonElement>){
        //console.log(childProps.onClick, 'button onclick')
        childProps.onClick && childProps.onClick(e)
        const action = dataMapAction(props) as ()=>boolean
        if (action===null) return 
        action()
    }
    if (name!==undefined){
    }
    return(
        <div className={cn(...css)}>
            <Button {...childProps} onClick={onClick}>{content}</Button>
        </div>
    )
}