import { storiesOf } from "@storybook/react";
import * as React from 'react';
import LoadConfig from '../components/load-config'
import { useState } from 'react'
import { IConfig } from '../types'

storiesOf("LoadConfig", module)
    .add("default",
        () => {
            const [config, setConfig] = useState<IConfig>()
            return (<LoadConfig setConfig={setConfig}/>)
        }
    )