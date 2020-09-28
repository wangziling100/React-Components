import * as React from 'react'
export function onBase(e: any, fn: Function[]){
    let tmpResult: any
    for (let f of fn){
        tmpResult = f(e, tmpResult)
    }
}
export function onChange(e: any, fn: Function[]){
    onBase(e, fn)
}

export function onClick(e: any, fn: Function[]){
    onBase(e, fn) 
}