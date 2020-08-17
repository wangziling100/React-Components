import { IConfig } from '../types'
export const storageName: string = 'plugin'
export interface IStorageObj {
        list: string[];
        configs: IConfigs;
        configDir: string;
        [propName: string]: Object;
}
interface IConfigs {
    [propName: string]: IConfig
}