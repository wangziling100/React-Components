import { storiesOf } from "@storybook/react";
import '../css/tailwind.css'
import Plugin from '../index';
import * as React from 'react';
storiesOf("Button", module)
    .add("default",
        () => {
          return(
              <div className='w-64'>
                <Plugin />
              </div>
          )
        }

    )
    
    