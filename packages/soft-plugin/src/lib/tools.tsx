import Group from '../components/group'
import Input from '../components/input'
import Password from '../components/password'
import Label from '../components/label'
import Button from '../components/button'
import Modal from '../components/modal'
import Textarea from '../components/textarea'
import Drawer from '../components/drawer'
import Builder from '../components/builder'
import Menu from '../components/menu'
import MenuItem from '../components/menu-item'
import Notification from '../components/notification'
import Dropdown from '../components/dropdown'
import { IDict } from '../types'
import * as React from 'react'
import * as Switch from '../actions/switch'
import * as IO from '../actions/io'
import * as Info from '../actions/info'
import * as Event from '../actions/event'
import * as Service from '../actions/service'
import { stateManager } from '@wangziling100/state-manager'

export function dataMapComponent(data:IDict, field:string, key:number):any|null{
    try{
        const type = Object.keys(data)[0]
        const props = data[type]
        props['field'] = field
        let component: any

        switch(type){
            case 'group': {
                const newProps = extractProps(props, 'group')
                newProps['field'] = field
                component=<Group {...newProps} key={key}/>; break;
            }
            case 'modal': {
                let newProps = extractProps(props, 'modal')
                newProps['field'] = field
                newProps = xToProps(newProps)
                component=<Modal {...newProps} key={key}/>; break;
            }
            case 'drawer': {
                let newProps = extractProps(props, 'drawer')
                newProps['field'] = field
                newProps = xToProps(newProps)
                component = <Drawer {...newProps} key={key}/>
                break
            }
            case 'menu': {
                let newProps = extractProps(props, 'menu')
                newProps['field'] = field
                //newProps = xToProps(newProps)
                component = <Menu {...newProps} key={key}/>;
                break;
            }
            case 'dropdown': {
                let newProps = extractProps(props, 'dropdown')
                newProps['field'] = field
                newProps = xToProps(newProps)
                component = <Dropdown {...newProps} key={key}/>;
                break;
            }
            case 'builder': component=<Builder {...props} key={key}/>; break;
            case 'input': component=<Input {...props} key={key}/>; break;
            case 'label': component=<Label {...props} key={key}/>; break;
            case 'password': component=<Password {...props} key={key}/>;break;
            case 'textarea': {
                component=<Textarea {...props} key={key}/>; 
                break;
            }
            case 'button': component=<Button {...props} key={key}/>; break;
            case 'notification': component=<Notification {...props} key={key}/>; break;
            case 'menu-item': {
                component=<MenuItem {...props} key={props.key}/>; break;
            }
            default: component=null; break;
        }
        return component
    }
    catch(err){
        console.log(err)
        return null
    }
}

export function dataMapAction(data:IDict){
    if (data.action===undefined) return null
    const actionType = data.action.type
    const id = data.field
    const option = data.action.option
    const obj = data.action.object
    const actionName = typeMapActionName(obj, actionType)
    let ret
    ret = nameMapAction(actionName, option, id)
    return ret
}
export function typeMapActionName(name:string, type:string):string{
    const actions = ['visible', 'io', 'info', 'service']
    let exist = false
    for (let n of actions){
        if(type===n) exist = true
    }
    if(!exist) throw('The action '+type+" dosen't exist")
    else return name+'_'+type
}

export function extractProps(data:Array<IDict>, type:string){
    let props = data[0]
    const itemName = Object.keys(props)[0]
    if(itemName!=='props') throw("The first attribute of "+type+" must be 'props'")
    props = props[itemName]
    const others = data.slice(1)
    props['data'] = others
    return props
}
interface IOUTExtractEvent {
    succeed: boolean,
    props: IDict,
    actions: IDict
}
export function extractEvents(props:IDict):IOUTExtractEvent{
    let ret: IDict = {}
    const field = props.field
    const actions = props.actions
    if (actions===undefined) return { succeed: false, props: props, actions:{}}
    const actionsChain: IDict = {}
    const actionsStore: IDict = {}
    for(let act of actions){
        // 自己的事件， 所有obj无用
        const key = Object.keys(act)[0]
        switch(key){
            case 'onClick':{
                const action =  findActionByTypeOption(field, act[key])
                try{
                    actionsChain['onClick'].push(action)
                }
                catch{
                    actionsChain['onClick'] = [action]
                }
                actionsStore['onClick'] = (e:any, input: Function[]) => Event.onClick(e, actionsChain['onClick'])
                break
            }
            default: break;
        }
    }
    for (let index in actionsStore){
        props[index] = actionsStore[index]
    }
    if (Object.keys(actionsStore).length>0){
        return {
            succeed: true,
            props: props,
            actions: actionsStore
        }
    }
    else {
        return {
            succeed: false,
            props: props,
            actions: {}
        }
    }
}

export function findActionByTypeOption(field:string, action: IDict){
    const type = action.type
    const option = action.option
    const obj = action.object
    switch (type){
        case 'io':{
            if (option==='getAllData') {
                return ()=>IO.getAllData(field)
            }
            else if (option==='set'){
                return (e:any, res:any)=>IO.setData(field, obj, obj, e)
            }
        }
        case 'service':{
            if (option==='submit'){
                const url = action.url
                const method = action.method
                return (e:any, data:any)=>Service.submit(url, data, method)
            }
            else if (option==='process'){
                return (e:any, res:Promise<any>)=>Service.processResponse(res)
            }
        }
    }
}

export function xToProps(props:IDict):IDict{
    let ret:IDict = {}
    const field = props.field
    const actions = props.actions
    for(let index in props){
        switch(index){
            case 'com':{
                // TODO
                break
            }
            case 'actions':{
                ret = extractPropsFromAction(field, actions)
                ret = Object.assign(props, ret)
                break
            }
            default: ret[index] = props[index]; break;
        }
    }
    return ret
}

export function extractPropsFromAction(field:string, actions:IDict){
    const ret:IDict = {}
    for(let index in actions){
        let action
        action = actions[index]
        const propName = Object.keys(action)[0]
        action = action[propName]
        const actionObj = action.object
        const actionOption = action.option
        const actionType = action.type
        const actionName = typeMapActionName(actionObj, actionType)
        ret[propName] = nameMapAction(actionName, actionOption, field)
    }
    return ret
}

export function nameMapAction(
name:string, 
option:string, 
id:string){
    let ret
    switch(option){
        case 'change': ret = ()=>Switch.change(id, name, name);break;
        case 'turnOn': ret = ()=>Switch.turnOn(id, name);break;
        case 'turnOff': ret = ()=>Switch.turnOff(id, name);break;
        case 'set':{
            ret = (value:any)=>{IO.setData(id, '', name, value, null)}
            break
        } 
        case 'notification': ret = ()=>Info.notificate(id, name); break;
        default: throw('It failed mapping data to action!!'); 
    }
    return ret
}

export function strToBoolean(data:string|boolean, defaultValue:boolean=false):boolean{
    if( typeof data === 'boolean'){
        return data
    }
    else if( data === 'true') return true
    else if (data === 'false') return false
    else return defaultValue
}

export function copy(data:IDict):IDict{
    const ret:IDict = {}
    for (let index in data){
        ret[index] = data[index]
    }
    return ret
}

export function addToStore(
id:string,
name:string, 
type:string, 
value:any, 
fn:Function){
    const actionName = typeMapActionName(name, type)
    stateManager.addState(id, actionName, value)    
    stateManager.addFunction(id, actionName, fn)
}