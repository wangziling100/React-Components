import {IDict} from '../types'
import * as React from 'react'
import '../css/tailwind.css'
import { dataMapComponent, copy } from '../lib/tools'
import BaseCom from './base-com'

interface IProps{
    data: IDict[]
    css: [] | null
    filed: string
}

export default (props:IDict) => {
    const childProps = copy(props)
    const data = props.data
    //const css = props.css || []
    const field = props.field
    const components = []
    let key = 0
    for (let el of data){
        const component = dataMapComponent(el, field, key)
        components.push(component)
        key++
    }
    childProps['type'] = props.type||'line'
    //console.log(childProps, 'line child props')
    //const main = BaseCom(childProps)

    //<div className={cn(...css)}>
    return(
        <BaseCom {...childProps}>
            {components}
        </BaseCom>
    )
}