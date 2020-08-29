import * as io from '../lib/io'
import { IConfig } from '../types'
import * as path from 'path'
import * as fs from 'fs'

test('read config file', ()=>{
    const fileName: string = path.join(__dirname, 'yaml/test1.yaml')
    const yamlFile = fs.readFileSync(fileName, 'utf-8')
    const test1: IConfig| null = io.readConfig(yamlFile)
    expect(test1).toEqual(
        {
            "name": "test1",
            "lines": {
                "1": [
                    {
                        "props": {
                        "css": [
                            "flex",
                            "justify-between"
                        ]
                        }
                    },
                    {
                        "input": {
                        "name": "name",
                        "save": true,
                        "css": [
                            "w-32"
                        ],
                        "placeholder": "Name"
                        }
                    },
                    {
                        "label": {
                        "css": [
                            "text-blue-500"
                        ],
                        "content": "Name"
                        }
                    }
                ],
                "2": [
                    {
                        "props": {
                        "css": [
                            "mt-2",
                            "flex",
                            "justify-between"
                        ]
                        }
                    },
                    {
                        "input": {
                        "name": "email",
                        "css": [
                            "w-32"
                        ],
                        "placeholder": "Email"
                        }
                    },
                    {
                        "label": {
                        "css": [
                            "text-blue-500"
                        ],
                        "content": "Email"
                        }
                    }
                ]
            }
        }
    )
})