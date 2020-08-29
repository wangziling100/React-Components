import * as React from 'react'
import { IDict } from '../types' 
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