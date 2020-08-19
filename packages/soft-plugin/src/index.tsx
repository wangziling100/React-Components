import './css/tailwind.css';
import * as React from 'react';
import { useState } from 'react';
import { Divider, Drawer, Collapse } from 'antd';
import 'antd/dist/antd.css';
import LoadConfig from './components/load-config'
import { IConfig } from './types'
import ManageState, { stateManager } from '@wangziling100/state-manager'

interface IProps {
    data: Object 

}

export default (props: IProps) => {
  // States
  const [ loadConfig, setLoadConfig ] = useState<IConfig>()
  const [visible, setVisible] = useState(false)
  // Variables
  const data = props.data
  const { Panel } = Collapse;
  // Functions
  const showDrawer = () => {
      setVisible(true)
  }
  const onClose = () => {
      setVisible(false)
  }
  return (
    <>
      <div  className='fixed right-0 mt-20 px-2 w-6 py-2
                      bg-blue-300 break-all text-center text-indigo-700
                      text-xs font-semibold uppercase
                      cursor-pointer'
            onClick={showDrawer}>
        Plugin
      </div>
      <ManageState>
        <Drawer
          title="Plugin System"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LoadConfig setConfig={setLoadConfig} />
          <Divider> Plugin List </Divider>
          <Collapse accordion>
            <Panel header="This is panel header 1" key="1">
              <p>text1</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>text2</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>text3</p>
            </Panel>
          </Collapse>
        </Drawer>
      </ManageState>
    </>
  )
    //return <button style={{color}} className="w-1 p-1" >Color Button</button>
}
