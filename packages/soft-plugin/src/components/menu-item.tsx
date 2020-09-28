import * as React from 'react'
import { useState } from 'react'
import cn from 'classnames'
import { IDict } from '../types'
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

    // States
    const [ data, setData ] = useState('')

    // Functions
    /*
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        setData(e.target.value)
    }
    childProps['onChange'] = onChange
    */

    // Init
    if (name!==undefined && save){
        stateManager.addState(id, name, data)
    }
    const {inner} = base('menu-item', childProps) 
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