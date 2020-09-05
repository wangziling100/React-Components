import { storiesOf } from "@storybook/react";
import { useState } from 'react'
import '../css/tailwind.css'
import 'antd/dist/antd.css'
import Plugin from '../index';
import * as React from 'react';
import { notification} from 'antd'
storiesOf("Plugin", module)
    .add("default",
        () => {
          const [visible, setVisible] = useState(true)
          const props = {
            setVisible: setVisible,
            visible: visible
          }
          const noti = () => { 
            notification['open']({
            message: 'Notification Title',
            description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            placement: 'topLeft'
            })
            setVisible(true)
          }
          return(
              <div className='w-64'>
                <button onClick={noti}>abc</button>
                <Plugin {...props}/>
              </div>
          )
        }

    )
    
    