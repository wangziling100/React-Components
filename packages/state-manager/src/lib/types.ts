export type IKey = string|string[]|null
export interface IDict{
    [propName: string]: any;
}
export type IBD = [boolean, IDict|null]