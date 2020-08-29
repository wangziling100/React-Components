import './css/tailwind.css';
import * as React from 'react';
import { useState } from 'react';
import { Divider, Drawer, Collapse } from 'antd';
import 'antd/dist/antd.css';
import LoadConfig from './components/load-config'
import { IConfig } from './types'
import { stateManager, useLocal } from '@wangziling100/state-manager'
import PluginList from './components/plugin-list';
import { IDict } from './types';

interface IProps {
    data: Object 
    drawerProps: IDict
}


function SoftPlugin(props: IProps){
  // States
  const [ loadConfig, setLoadConfig ] = useState<IConfig>()
  const [visible, setVisible] = useState(false)
  const [ configs, setConfigs ] = useState({})
  // Variables
  const id = 'index'
  const data = props.data
  const { Panel } = Collapse;
  const drawerProps = props.drawerProps || {width:420}
  // Functions
  const showDrawer = () => {
      setVisible(true)
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
  useLocal('index')
  // Components
  const tmp = []
  tmp.push(<div> test here </div>)

  return (
    <>
      <div  className='fixed right-0 mt-20 px-2 w-6 py-2
                      bg-blue-300 break-all text-center text-indigo-700
                      text-xs font-semibold uppercase
                      cursor-pointer'
            onClick={showDrawer}>
        Plugin
      </div>
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

export default SoftPlugin