import * as React from 'react'
import { useState } from 'react'
import cn from 'classnames'
//import '../css/tailwind.css'
import { IDict } from '../types'
//import 'antd/dist/antd.css'
import { stateManager } from '@wangziling100/state-manager'
import { copy, strToBoolean, dataMapAction } from '../lib/tools'
import base from './base'

export default (props: IDict) => {
    // Variables
    const childProps = copy(props)
    const css = props.css || []
    const id = props.field
    const name = props.name
    const saveString:string = props.save
    const save = strToBoolean(saveString, false)

    // States
    const [ data, setData ] = useState('')

    // Functions
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        setData(e.target.value)
        const action = dataMapAction(props)
        action(e.target.value)
    }
    childProps['onChange'] = props.onChange||onChange

    // Init
    if (name!==undefined && save){
        stateManager.addState(id, name, data)
    }
    const {inner} = base('textarea', childProps) 
    const main = (
        <div className={cn(...css)}>
            {inner}
        </div>
    )
 
    return(
        <>
          {main}
        </> 
    )
}