import { storiesOf } from "@storybook/react";
import * as React from 'react';
import Test from './render'
import TestEffect from './test-effect'
import TestAsync from './test-async'
storiesOf("state manager", module)
    .add("default",
        () => {
            return(
                <>
                  <Test/>
                </>
            )
        }
    )
    .add("effect", ()=><TestEffect/>)
    .add("async", ()=><TestAsync/>)
    
    