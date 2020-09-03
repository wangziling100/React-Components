## Introduction
The library is used to uniformly manage the state of different components. Its function is similar to Redux, but easier to use

## Quick Start
App.js
```js
import React, { useState } from "react";
import "./styles.css";
import  { stateManager } from "@wangziling100/state-manager";

export default function App() {
  const id = "test";
  const [a, setA] = useState("Hello");
  stateManager.addState(id, "a", a);
  stateManager.addFunction(id, "setA", setA);
  function onClick() {
    const b = stateManager.getState(id, "a");
    const setB = stateManager.getFunction(id, "setA");
    setB(b + "!");
  }
  return (
    <div className="App">
        <div onClick={onClick}> click me </div>
        <div>{a}</div>
    </div>
  );
}
```

The stateManagers instance manages all states and actions changing states. Here are several important methods:  
- addState: add a state to instance
- addFunction: add a function to instance
- getState: read a state from instance
- getFunction: read a function from instance

CodeSandbox: [javascript](https://codesandbox.io/s/state-manager-javascript-mqy44?file=/src/App.js:221-233) [Typescript](https://codesandbox.io/s/store-manager-typescript-demo-kzolf)

## sessionStorage and localStorage
The library supports state persistence solutions based on sessionStorage and localStorage.

```js
import * as React from "react";
import { useState } from "react";
import { stateManager, useSession } from "@wangziling100/state-manager";

export default (props: any) => {
  const id = "hello";
  useSession(id);
  const [hello, setHello] = useState("Hello");
  const [hi, setHi] = useState("Hi");

  stateManager.addFunction(id, "setHello", setHello);
  stateManager.addState(id, "hello", hello);
  stateManager.addFunction(id, "hi", setHi);
  stateManager.addState(id, "hi", hi);
  console.log(stateManager.getStore(), "store");
  stateManager.addToSessionSet(id, "ALL");
  stateManager.addToLocalSet(id, ["hi"]);

  return (
    <>
      <div> {hello} </div>
      <div> {hi} </div>
    </>
  );
};
```
### Important functions:
- useSession: load states from sessionStorage when page is refreshed.
- useLocal: load states from localStorageg when page is refreshed.
- addToSessionSet: register states and their update function, which will be stored in sessionStorage later.
- addToLocalSet: register states and their update function, which will be stored in localStorage later.
- writeSession: store registered states into Storage
- writeLocal: like writeSession

### Parameters:
- addToSessionSet(id:string|string[]|'ALL', key:string|string[]|'ALL', func:string|null)
1. id: table name or names, which is corresponding with item name in term of concepts of storage
2. key: index of a state
3. func: index of a update function, usually is a setState function, it depends on the function you stored in stateManager instance. One can also add some type check function before update in it. If set null, a function with index `set+$StateName` or `$StateName` will be check as default during reloading states. 
4. Note: If you don't want to store a state in Storage, don't use this method or use a useless function as the third parameter.
- writeSession(id: string | string[], delay: number)
1. id: table name or names, which is corresponding with item name in term of concepts of storage
2. delay: use to ensure writing state after state changed. Default is 0, but sometimes it is enough.

CodeSandBox: [Typescript](https://codesandbox.io/s/state-manager-effect-typescript-milxf?file=/src/hello.tsx)


