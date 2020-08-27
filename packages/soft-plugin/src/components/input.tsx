import * as React from 'react'
import { useState } from 'react'
import { Input } from 'antd'
import cn from 'classnames'
import '../css/tailwind.css'
import { IDict } from '../types'
import 'antd/dist/antd.css'
import { stateManager } from '@wangziling100/state-manager'
import { copy, strToBoolean } from '../lib/tools'
import base from './base'

export default (props: IDict) => {
    // Variables
    const childProps = copy(props)
    const css = props.css || []
    const id = props.field
    const name = props.name
    const saveString:string = props.save
    const save = strToBoolean(saveString, false)
    //const visibleString:string = props.visible
    //const initVisible = strToBoolean(visibleString, true)

    // States
    const [ data, setData ] = useState('')
    //const [ visible, setVisible] = useState(initVisible)
    // Functions
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        setData(e.target.value)
    }
    childProps['onChange'] = onChange
    // Init
    if (name!==undefined && save){
        stateManager.addState(id, name, data)
    }
    const {inner} = base('input', childProps) 
    //<Input {...props} onChange={onChange}/>
    const main = (
        <div className={cn(...css)}>
            {inner}
        </div>
    )
 
    //console.log(data, 'input')

    //{visible && main}
    return(
        <>
          {main}
        </> 
    )
}