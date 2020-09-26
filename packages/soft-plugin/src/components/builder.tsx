import * as React from 'react'
import { useState } from 'react'
import { IDict } from '../types'
import { readConfigWithErrMessage } from '../lib/io'
import Line from './line'
import { extractProps, strToBoolean, addToStore } from '../lib/tools'

export default (props:IDict) => {
    const id = props.field
    const name = props.name
    const ioString = props.allowIO
    const allowIO = strToBoolean(ioString, true)
    const [ data, setData ] = useState('')
    const config = readConfigWithErrMessage(data)
    if (allowIO){
        addToStore(id, name, 'io', data, setData)
    }
    let main
    if (typeof config==='string'){
        main = <>{config}</>
    }
    else{
        try{
            const lineData= config.lines
            const field = config.name
            const lines = []
            for (let index in lineData){
                const props = extractProps(lineData[index], 'line')
                props['key'] = index
                props['field'] = field
                const line = <Line {...props}/>
                lines.push(line)
            }
            main = <>{lines}</>
        }
        catch(err){
            console.log(err)
            const configJSON= JSON.stringify(config)
            main = <div>{configJSON}</div>
        }
        
    }
    return(
        <>
          {main}
        </>
    )
}