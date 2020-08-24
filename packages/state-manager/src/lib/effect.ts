import { useEffect } from 'react'
import { stateManager } from '../index'
export function useSession(id:string|string[], syncWrite=false, update=[]){
    useEffect(()=>{
        if(syncWrite){
            stateManager.writeSession(id)
        }
        stateManager.loadSession(id)
    }, [id, syncWrite, ...update])

}

export function useLocal(id:string|string[], syncWrite=false, update=[]){
    useEffect(()=>{
        if (syncWrite){
            stateManager.writeLocal(id)
        }
        stateManager.loadLocal(id)
    }, [id, syncWrite, ...update])
}