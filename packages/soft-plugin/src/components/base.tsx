import * as React from 'react'
import { IDict } from '../types'
import { Input, Modal } from 'antd'
import { strToBoolean, typeMapActionName } from '../lib/tools'
import { useState } from 'react'
import { stateManager } from '@wangziling100/state-manager'


export default (type:string,props:IDict) => {
    let main: any
    // Variables
    const id = props.field
    const name = props.name
    const visibleString = props.visible
    const initVisible = strToBoolean(visibleString, true)
    const onChange = props.onChange
    const onOk = props.onOk
    const onCancel = props.onCancel
    // States
    const [visible, setVisible] = useState(initVisible)
    if (visibleString!==undefined){
        const actionName:string = typeMapActionName(name, 'visible')
        stateManager.addState(id, actionName, visible)
        stateManager.addFunction(id, actionName, setVisible)
    }

    switch (type){
        case 'input': main = visible && <Input {...props} onChange={onChange}/>;break;
        case 'modal': {
            main = visible && <Modal 
            {...props}
            onOk={onOk} 
            onCancel={onCancel} 
            visible={visible}/>
            break;
        }
        default: main = null; break;
    }
    

    return { inner:main }
}