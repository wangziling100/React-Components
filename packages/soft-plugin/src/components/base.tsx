import * as React from 'react'
import { IDict } from '../types'
import { Input, Menu } from 'antd'
import { strToBoolean, addToStore } from '../lib/tools'
import { useState } from 'react'


export default (type:string,props:IDict) => {
    let main: any
    // Variables
    const id = props.field
    const name = props.name
    const visibleString = props.visible
    const initVisible = strToBoolean(visibleString, true)
    const onChange = props.onChange
    const { TextArea } = Input
    // States
    const [visible, setVisible] = useState(initVisible)
    if (visibleString!==undefined){
        /*
        const actionName:string = typeMapActionName(name, 'visible')
        stateManager.addState(id, actionName, visible)
        stateManager.addFunction(id, actionName, setVisible)
        */
        addToStore(id, name, 'visible', visible, setVisible)
    }

    switch (type){
        case 'input': main = visible && <Input {...props} onChange={onChange}/>;break;
        case 'textarea': {
            main = visible && <TextArea {...props} onChange={onChange}/>
            break;
        }
        case 'password': main = visible && <Input.Password {...props} onChange={onChange}/>;break;
        case 'menu-item': {
            main = visible && <Menu.Item {...props}> {props.content}</Menu.Item>
            break
        }
        default: main = null; break;
    }
    

    return { inner:main }
}