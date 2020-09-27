import * as React from 'react'
export function onBase(e: any, fn: Function[]){
    let tmpResult: any
    for (let f of fn){
        console.log(f, tmpResult, 'base event')
        tmpResult = f(e, tmpResult)
    }
}
export function onChange(e: any, fn: Function[]){
    onBase(e, fn)
}

export function onClick(e: any, fn: Function[]){
    console.log('event onclick')
    onBase(e, fn) 
}