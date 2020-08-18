export interface IConfig{
    config: Object;
    [propNames: string]: any;
}

export interface IState{
    key: string;
    value: any;
}

export interface IAction{
    name: string;
    fn: any;
}

export interface IPlugin{
    name: string;
    configs: IConfig[];
    states: IState[];
    actions: IAction[];
}

