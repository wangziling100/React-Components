import * as io from '../lib/io'
import { IConfig } from '../types'
import * as path from 'path'
import * as fs from 'fs'

test('read config file', ()=>{
    const fileName: string = path.join(__dirname, 'yaml/test1.yaml')
    const yamlFile = fs.readFileSync(fileName, 'utf-8')
    const test1: IConfig| null = io.readConfig(yamlFile)
    expect(test1).toEqual({
        "line": {
            "1": [
            {
                "input": {
                "param2": "bcd", 
                "param1": "abc"
                }
            }, 
            {
                "input": "defualt"
            }
            ]
        }
    })
})