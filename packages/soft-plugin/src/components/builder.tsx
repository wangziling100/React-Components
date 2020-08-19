import { IConfig } from "../types";
import * as React from 'react'
import '../css/tailwind.css'
import Line from './line'

export default (props: IConfig) => {
    const config = props.config as any
    const lines = []
    if (config.line===undefined) return
    for (let index in config.line){
        lines.push(<Line config={config.line[index]}/>)
    }

    return(
        <>
          <div>
              {lines}
          </div>
        </>
    )
}