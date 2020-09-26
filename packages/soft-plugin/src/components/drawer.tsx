import * as React from 'react'
import { copy } from '../lib/tools'
import { IDict } from '../types'
import Line from './line'

export default (props: IDict) => {
    // Variables
    const childProps = copy(props)
    childProps['type'] = 'drawer'
    return <Line {...childProps} />
}