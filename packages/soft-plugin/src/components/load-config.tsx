import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
//import '../css/tailwind.css'
//import 'antd/dist/antd.css';
import * as React from 'react'
import { useState } from 'react'
import * as io from '../lib/io'
import cn from 'classnames'
import { IConfig } from '../types'
import { stateManager } from '@wangziling100/state-manager'
import { IDict } from '../types';

interface IProps {
  setConfig: React.Dispatch<React.SetStateAction<IConfig|undefined>>;
  onLoaded: Function;
}
export default (props: IProps) => {
  //console.log(props, 'props')

  const onLoaded= props.onLoaded
  const [succeed, setSucceed] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const titleCSS = ['text-sm', 'font-semibold']
  const textCSS = ['text-sm','text-red-500', 'ml-2', 'font-light', 'mt-1']

  function loadConfig({file}:any){
    console.log(file, 'data')
    let reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onload = function(){
      console.log(this.result)
      const config: IConfig|null = io.readConfig(this.result as string)
      console.log(config, 'config')

      if (config!==null) {
        console.log(config)
        setSucceed(true)
        let configs = stateManager.getState('soft-plugin-index', 'configs')
        const name = config.name
        const storedConfig: IDict = {}
        storedConfig[name] = config
        configs = Object.assign(configs, )
        const setConfigs = stateManager.getFunction('soft-plugin-index', 'setConfigs')
        setConfigs(Object.assign(configs, storedConfig))
        stateManager.writeLocal('soft-plugin-index')
        if (props!==undefined){
          props.setConfig(config)
        }
        onLoaded()
      }
      else {
        setSucceed(false)
      }
      setLoaded(true)
    }
  }

  function onClick(){
    setLoaded(false)
    setSucceed(false)
  }


  return (
    <>
      <div className={cn(...titleCSS)}> Load a plugin</div>
      <div className='flex mt-2'>
        <Upload showUploadList={false} customRequest={loadConfig}>
          <Button onClick={onClick}>
              <div className='flex'>
                <div className='mr-1'>
                  <UploadOutlined /> 
                </div>
                <div className='text-xs ml-1'>
                  Click to Upload 
                </div>
              </div>
          </Button>
        </Upload>
        <div className={cn({'hidden':!loaded||!succeed}, ...textCSS)}> succeed!</div>
        <div className={cn({'hidden':!loaded||succeed}, ...textCSS)}> failed!</div>
      </div>
    </>
  )
}