import * as React from 'react'
import {listenerArray} from './test'

export default (props:any) => {
    const onClick = () => {
        listenerArray[0](true)
    }
    return(
      <>
        <button onClick={onClick}> click me </button>
      </>
    )
}