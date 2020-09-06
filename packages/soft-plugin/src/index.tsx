//import './css/tailwind.css';
import * as React from 'react';
import { useState } from 'react';
import { Divider, Drawer, Collapse } from 'antd';
//import 'antd/dist/antd.css';
import LoadConfig from './components/load-config'
import { IConfig } from './types'
import { stateManager, useLocal } from '@wangziling100/state-manager'
import PluginList from './components/plugin-list';
import { IDict } from './types';
import { setVisible } from './lib/options';
interface IProps {
    data: Object 
    drawerProps: IDict
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default (props: IProps|undefined) => {
  console.log('index')
  // States
  const [ loadConfig, setLoadConfig ] = useState<IConfig>()
  //const [visible, setVisible] = useState(false)
  const [ configs, setConfigs ] = useState({})
  // Variables
  const id = 'soft-plugin-index'
  let data, drawerProps, visible
  let setVisible: Function
  if(props!==undefined){
    data = props.data || null
    drawerProps = props.drawerProps || {width:420}
    visible = props.visible 
    setVisible = props.setVisible
  }
  else{
    drawerProps = {width:420}
    visible = false
    setVisible = ()=>{}
  }
  const onClose = () => {
      setVisible(false)
  }
  const onConfigLoaded = () => {
    stateManager.writeLocal(id)
  }
  // Init
  stateManager.addState(id, 'loadConfig', loadConfig)
  stateManager.addFunction(id, 'setLoadConfig', setLoadConfig)
  stateManager.addState(id, 'configs', configs)
  stateManager.addFunction(id, 'setConfigs', setConfigs)
  stateManager.addToLocalSet(id, 'configs')
  // Effect
  useLocal('soft-plugin-index')
  // Components
  const tmp = []
  tmp.push(<div> test here </div>)

  return (
    <>
      <Drawer
        title="Plugin System"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        {...drawerProps}
      >
        <LoadConfig setConfig={setLoadConfig} onLoaded={onConfigLoaded}/>
        <Divider> Plugin List </Divider>
        <PluginList data={configs}/>
      </Drawer>
    </>
  )
}
/*
export default (props:any) => {
  return(
    <div> Default </div>
  )
}
*/