import * as React from 'react'
import { IDict } from '../types' 
import cn from 'classnames'
import Line from './line'
interface IProps{
    data: IDict;
}
export default (props:IDict) => {
    console.log(props, 'group')
    return(
        <>
          <Line {...props}/>
        </>
    )
}
/*
export default (props:IDict)=> {
    const data = props.data 
    const css = props.css || []
    const components = []
    for (let el of data){

    }
    return(
        <div className={cn(...css)}>
        </div>
    )
}
*/