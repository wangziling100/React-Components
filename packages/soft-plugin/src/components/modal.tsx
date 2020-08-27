import * as React from 'react'
import { copy, strToBoolean } from '../lib/tools'
import base from './base'
import { IDict } from '../types'
import cn from 'classnames'
import { stateManager } from '@wangziling100/state-manager'

export default (props: IDict) => {
    // Variables
    const childProps = copy(props)
    const css = props.css || []
    const id = props.field
    const name = props.name
    const saveString:string = props.save
    const save = strToBoolean(saveString, false)

    // States
    // Functions
    // Init
    const {inner} = base('input', childProps) 
    //<Input {...props} onChange={onChange}/>
    const main = (
        <div className={cn(...css)}>
            {inner}
        </div>
    )
 
    console.log(data, 'input')

    //{visible && main}
    return(
        <>
          {main}
        </> 
    )
}