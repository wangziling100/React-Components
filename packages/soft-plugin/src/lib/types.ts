import { IConfig } from '../types'
export const storageName: string = 'plugin'
export interface IStorageObj {
        list: string[];
        configs: IConfigs;
        configDir: string;
        [propName: string]: Object;
}
export interface IConfigs {
    [propName: string]: IConfig
}