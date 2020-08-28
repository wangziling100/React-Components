import * as React from 'react'
import { IDict } from '../types'
import { Input, Modal } from 'antd'
import { strToBoolean, typeMapActionName } from '../lib/tools'
import { useState } from 'react'
import { stateManager } from '@wangziling100/state-manager'
import cn from 'classnames'


export default (props:IDict) => {
    let main: any
    // Variables
    //console.log(props, 'base props')
    const id = props.field
    const name = props.name
    const visibleString = props.visible
    const initVisible = strToBoolean(visibleString, true)
    const onChange = props.onChange
    const onOk = props.onOk
    const onCancel = props.onCancel
    const css = props.css||[]
    //console.log(css, 'base css')
    const type = props.type
    // States
    const [visible, setVisible] = useState(initVisible)
    if (visibleString!==undefined){
        const actionName:string = typeMapActionName(name, 'visible')
        stateManager.addState(id, actionName, visible)
        stateManager.addFunction(id, actionName, setVisible)
    }

    switch (type){
        case 'modal': {
            console.log(props, 'modal props base')
            main = <Modal 
            {...props}
            onOk={onOk} 
            onCancel={onCancel} 
            visible={visible}>
                {props.children}
            </Modal>
            break;
        }
        case 'line': {
            main = (
                <div {...props} className={cn(...css)}>
                    {props.children}
                </div>
            )
            break;
        }
        default: main = <>{props.children}</>; break;
    }
    

    return (
        <>
        { visible && main }
        </>
    )
}