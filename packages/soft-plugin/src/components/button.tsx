import * as React from 'react'
import { Button } from 'antd'
import cn from 'classnames'
import { IDict } from '../types'
import { dataMapAction } from '../lib/tools'


export default (props: IDict) => {
    const css = props.css || []
    const name = props.name
    const content = props.content
    function onClick(e:React.MouseEvent<HTMLButtonElement>){
        const action = dataMapAction(props) as ()=>boolean
        if (action===null) return 
        action()
    }
    if (name!==undefined){
    }
 
    return(
        <div className={cn(...css)}>
            <Button {...props} onClick={onClick}>{content}</Button>
        </div>
    )
}