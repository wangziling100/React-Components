import { storiesOf } from "@storybook/react";
import * as React from 'react';
import Test from './render'
import TestEffect from './test-effect'
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
    
    