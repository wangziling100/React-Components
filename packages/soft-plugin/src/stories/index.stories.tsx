import { storiesOf } from "@storybook/react";
import Plugin from '../components';
import * as React from 'react';
storiesOf("Button", module)
    .add("red",
        () => <Plugin css={[]} />
    )
    .add("blue",
        () => <Plugin />
    )
    