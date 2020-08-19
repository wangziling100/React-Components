import { storiesOf } from "@storybook/react";
import '../css/tailwind.css'
import * as React from 'react';
import Test from '../components/test-provider'

storiesOf("Test", module)
    .add("default",
        () => {
          return(
              <>
                <Test/>
              </>
          )
        }

    )