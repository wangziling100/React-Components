import { storiesOf } from "@storybook/react";
import * as React from 'react';
import StateManager from '../index'
import Test from '../components/test'
import TestButton from '../components/test-button'
storiesOf("state manager", module)
    .add("default",
        () => {
            return(
                <StateManager>
                    <TestButton/>
                    <Test/>
                </StateManager>
            )
        }
    )
    
    