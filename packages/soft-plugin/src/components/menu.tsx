import * as React from 'react'
import { useState } from 'react'
import { copy, strToBoolean, extractEvents, dataMapAction } from '../lib/tools'
import { IDict } from '../types'
import Line from './line'
import { stateManager } from '@wangziling100/state-manager'

export default (props: IDict) => {
    // Variables
    let childProps = copy(props)
    childProps['type'] = 'menu'
    const name = props.name
    const id = props.field
    const saveString:string = props.save
    const save = strToBoolean(saveString, false)
    const actions = extractEvents(childProps).actions

    // State
    const [data, setData] = useState('')
    // Init
    if (name!==undefined && save){
        stateManager.addState(id, name, data)
        stateManager.addFunction(id, name, setData)
    }
    // Functions
    const onClick=({key}:any)=>{
        //setData(key)
        setData(key)
        actions.onClick && actions.onClick(key)
        props.onClick && props.onClick(key)
        const action = dataMapAction(props) as ()=>boolean
        if (action===null) return 
        action()
    }
    childProps['onClick'] = onClick
    

    return <Line {...childProps} />
}