import * as React from 'react'
import { Collapse } from 'antd'
import { IConfigs } from '../lib/types'
import PluginItem from './plugin-item';

interface IProps{
    data:IConfigs;
}

export default (props:IProps) => {
    const data = props.data;
    //console.log(data, 'plugin list')
    const panels = []
    const { Panel } = Collapse
    let cnt = 1
    for (let key in data){
        const config = data[key]
        const panel = (
          <Panel header={config.name} key={cnt}>
            <PluginItem data={config} key={cnt} />
          </Panel>
        )
        panels.push(panel)
        cnt++
    }
    return(
        <>
        <Collapse accordion>
          {panels}
        </Collapse>
        </>
    )
}