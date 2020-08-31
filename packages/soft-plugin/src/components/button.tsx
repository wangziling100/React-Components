import * as React from 'react'
import { Button } from 'antd'
import cn from 'classnames'
import '../css/tailwind.css'
import { IDict } from '../types'
import 'antd/dist/antd.css'
//import { stateManager } from '@wangziling100/state-manager'
import { dataMapAction } from '../lib/tools'
export default (props: IDict) => {
    const css = props.css || []
    const name = props.name
    const content = props.content
    function onClick(e:React.MouseEvent<HTMLButtonElement>){
        const action = dataMapAction(props) as ()=>boolean
        action()
    }
    if (name!==undefined){
    }
    console.log(props, 'button')
 
    return(
        <div className={cn(...css)}>
            <Button {...props} onClick={onClick}>{content}</Button>
        </div>
    )
}