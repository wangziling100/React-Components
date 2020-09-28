import * as React from 'react'
import cn from 'classnames'
import { stateManager } from '@wangziling100/state-manager'
import { strToBoolean } from '../lib/tools'
export default (props: any) => {
    const css = props.css || []
    const content = props.content || ''
    const id = props.field
    const name = props.name
    const saveString:string = props.save
    const save = strToBoolean(saveString, false)
    if (name!==undefined && save){
        stateManager.addState(id, name, content)
    }
    return(
        <div className={cn(...css)}>
            {content}
        </div>
    )
}