import * as React from 'react'
import { useState } from 'react'
import cn from 'classnames'
import { addListener } from 'process'

export let listenerArray:any = []
export default (props:any) => {
    const [ visible, setVisible ] = useState(false)
    listenerArray.push(setVisible)
    return(
      <>
        <div className={cn({'hidden':!visible})}>Hello!!!</div>  
      </>
    )
}

