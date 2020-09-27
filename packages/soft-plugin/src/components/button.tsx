import * as React from 'react'
import { Button } from 'antd'
import cn from 'classnames'
import { IDict } from '../types'
import { dataMapAction, copy, extractEvents } from '../lib/tools'


export default (props: IDict) => {
    const css = props.css || []
    const name = props.name
    const content = props.content
    let childProps = copy(props)
    childProps = extractEvents(childProps)
    console.log(childProps, 'button')
    function onClick(e:React.MouseEvent<HTMLButtonElement>){
        console.log(childProps.onClick, 'button onclick')
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