import * as React from 'react'
import { IConfig } from '../types'
import Line from './line'
import { extractProps } from '../lib/tools'
import { stateManager } from '@wangziling100/state-manager'

interface IProps{
    data: IConfig;
}

export default (props: IProps) => {
    // Variables
    const config = props.data;
    const lineData= config.lines
    const field = config.name
    const lines = []
    // States
    // Functions
    const deleteAction = ()=>{
      stateManager.delete(field)
      const setConfigs = stateManager.getFunction('soft-plugin-index', 'setConfigs')
      const configs = stateManager.getState('soft-plugin-index', 'configs')
      const refresh = stateManager.getState('soft-plugin-index', 'refresh')
      const setRefresh = stateManager.getFunction('soft-plugin-index', 'setRefresh')
      delete configs[field]
      setConfigs(configs)
      stateManager.addState('soft-plugin-index', 'configs', configs)
      stateManager.writeLocal('soft-plugin-index')
      setRefresh(!refresh)
    }
    // Init
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
        <div 
        className='flex justify-end
                   text-gray-400 hover:text-blue-300 
                   cursor-pointer'
        onClick={deleteAction}> 
          delete 
        </div>
        {lines}
      </>
    )
    return(
        <>
          {main}
        </>
    )
}