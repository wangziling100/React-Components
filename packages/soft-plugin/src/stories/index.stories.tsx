import { storiesOf } from "@storybook/react";
import Plugin from '../index';
import * as React from 'react';
storiesOf("Button", module)
    .add("default",
        () => <Plugin css={[]} />
    )
    
    