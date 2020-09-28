import {IDict} from '../types'
import * as React from 'react'
import { useState } from 'react'
//import '../css/tailwind.css'
import { dataMapComponent, copy } from '../lib/tools'
import BaseCom from './base-com'
import { stateManager } from '@wangziling100/state-manager'

interface IProps{
    data: IDict[]
    css: [] | null
    filed: string
}

export default (props:IDict) => {
    const childProps = copy(props)
    const data = props.data
    const field = props.field
    let child
    let key = 0

    
    //childProps['overlay'] = dataMapComponent(data, field, key)
    for (let el of data){
        const type = Object.keys(el)[0]
        if(type==='overlay') {
            childProps['overlay'] = dataMapComponent(el['overlay'][0], field, key)
        }
        else{
            child = dataMapComponent(el, field, key)
        } 
        
        key++
    }
    childProps['type'] = 'dropdown'
    
    //console.log(child, key, 'dropdown child')
    //console.log(childProps['overlay'], 'dropdown overlay')
    //const main = BaseCom(childProps)

    //<div className={cn(...css)}>
    return(
        <BaseCom {...childProps}>
            {child}
        </BaseCom>
    )
}