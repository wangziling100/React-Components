import * as React from 'react'
import cn from 'classnames'
import { stateManager } from '@wangziling100/state-manager'
export default (props: any) => {
    const css = props.css || []
    const content = props.content || ''
    const id = props.field
    const name = props.name
    if (name!==undefined){
        stateManager.addState(id, name, content)
    }
    return(
        <div className={cn(...css)}>
            {content}
        </div>
    )
}