import * as React from 'react'
import { IConfig } from '../types'
import Line from './line'
import { extractProps } from '../lib/tools'

interface IProps{
    data: IConfig;
}

export default (props: IProps) => {
    const config = props.data;
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
    console.log(lines, 'lines')
    const main = (
      <>
        {lines}
      </>
    )
    return(
        <>
          {main}
        </>
    )
}