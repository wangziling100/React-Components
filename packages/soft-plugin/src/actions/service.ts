//import { stateManager } from '@wangziling100/state-manager'
import axios from 'axios'
import { IDict } from '../types'
export function submit(
url:string, 
data: IDict,
method:string='post'){
    try{
        switch(method){
            case 'POST':
            case 'post': {
                console.log('post')
                return axios.post(url,{
                    ...data
                },{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        accept: 'application/json'
                    }
                })
            }
            default: return null
        }
    }
    catch(err){
        console.log(err)
        return null
    }
}

export function processResponse(
response: Promise<string> | null
){
    if(response===null) return null
    response
    .then(res=>console.log(res))
    .catch(err=>console.error(err.response))
}