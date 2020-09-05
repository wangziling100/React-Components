import * as React from 'react'
import { useState } from 'react'
import cn from 'classnames'
import { IDict } from '../types'
import { stateManager } from '@wangziling100/state-manager'
import { copy, strToBoolean, typeMapActionName } from '../lib/tools'
import base from './base'
import { notification } from 'antd'
import { NotificationApi } from 'antd/lib/notification'
import { ArgsProps } from 'antd/lib/notification'

export default (props: IDict) => {
    // Variables
    const id = props.field
    const name = props.name
    const type = props.type
    const childProps = copy(props)
    if (props.message===undefined
    || props.description===undefined){
        childProps['message'] = 'Wrong Message'
        childProps['description'] = 
        'Message or Description of this notification is undefined'
        childProps['type'] = 'error'
    }

    const noti = () => {
        let api 
        switch(type){
            case 'success': api = notification.success; break;
            case 'error': api = notification.error; break;
            case 'info': api = notification.info; break;
            case 'warning': api = notification.warning; break;
            case 'warn': api = notification.warn; break;
            case 'open': api = notification.open; break;
            case 'close': api = notification.close; break;
            case 'destroy': api = notification.destroy; break;
            default: return
        }
        api(childProps as (ArgsProps & string))
    }
    // Init
    const funcName = typeMapActionName(name, 'info')
    stateManager.addFunction(id, funcName, noti)
    return(
        <></> 
    )
}