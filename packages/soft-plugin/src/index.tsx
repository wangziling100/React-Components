import './css/tailwind.css';
import { useState } from 'react';
import * as React from 'react';
import { IPlugin } from './types'
import cn from 'classnames'

interface IProps {
    plugins: IPlugin[]
    css: string[]
    itemCSS: string[][]
}

const defaultProps: IProps = {
    plugins: [{
        name: 'default',
        configs: [],
        states: [],
        actions: []
    }],
    css: [],
    itemCSS: []
}
export default (props: IProps=defaultProps) => {
    const plugins = props.plugins;
    const css = props.css
    return (
        <>
            <div className={cn(...css)}>
                <div>
                    Plugin System
                    <hr/>
                </div>
            </div>
        </>
    )
    //return <button style={{color}} className="w-1 p-1" >Color Button</button>
}
