import * as React from 'react'
import { copy, strToBoolean } from '../lib/tools'
import { IDict } from '../types'
import Line from './line'
import { Drawer } from 'antd'

export default (props: IDict) => {
    // Variables
    const childProps = copy(props)
    childProps['type'] = 'drawer'
    //console.log(childProps, 'drawer props')
    return <Line {...childProps} />
    //return <Drawer visible={true} placement='left'></Drawer>
}