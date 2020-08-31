import * as React from 'react'
import { copy } from '../lib/tools'
import { IDict } from '../types'
import Line from './line'

export default (props: IDict) => {
    // Variables
    const childProps = copy(props)
    childProps['type'] = 'modal'
    return <Line {...childProps} />
    /*
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
 

    //{visible && main}
    return(
        <>
          {main}
        </> 
    )
    */
}