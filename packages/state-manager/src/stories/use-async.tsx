import * as React from 'react'
import { stateManager } from '../index'
import Hello from './test-async'
import { useEffect, useState } from 'react'

export default (props:any)=>{

    const [state, setState] = useState<any>()
    const [func, setFunc] = useState<any>()
    useEffect(()=>{
        console.log('before')
        const st = stateManager.getStateAsync('async', 'hello', 2000)
        const fn = stateManager.getFunctionAsync('async', 'setHello', 2000)
        setState(st)
        setFunc(fn)
        console.log('after')
    },[])
    async function onClick(){
        console.log(stateManager.getStore(), 'on click')
        const value = await state.then(ret=>{
            return Promise.resolve(ret)
        })        
        const setValue = await func.then(ret=>{
            return Promise.resolve(ret)
        })
        setValue(value+'!')
    }
    return (
        <>
            <button onClick={onClick}>Click me</button>
        </>
    )
}