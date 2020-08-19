import { storiesOf } from "@storybook/react";
import * as React from 'react';
import ManageState from '../index'
import Test from './test'
import TestButton from './test-button'
storiesOf("state manager", module)
    .add("default",
        () => {
            return(
                <>
                  <ManageState>
                    <TestButton/>
                    <Test/>
                  </ManageState>
                </>
            )
        }
    )
    
    