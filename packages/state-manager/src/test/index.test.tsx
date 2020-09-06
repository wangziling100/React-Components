import {stateManager} from '../index'

beforeEach(()=>{
  sessionStorage.clear()
  localStorage.clear()
})
afterEach(()=>{
  sessionStorage.clear()
  localStorage.clear()
})

test('stateManager', ()=>{
    let state1 = 'abc'
    const set1 = () => { state1+='!'}
    stateManager.addState('test', 'state1', state1)
    stateManager.addFunction('test', 'set1', set1)
    expect(stateManager.getState('test', 'state1')).toEqual(state1)
    expect(stateManager.getFunction('test', 'set1')).toEqual(set1)
    stateManager.addToSessionSet('test', 'state1', 'set1')
    stateManager.addToLocalSet('test', 'state1', 'set1')
    expect(stateManager.getAllManagers()).toEqual({})
    
    jest.useFakeTimers()
    stateManager.writeLocal('test')
    stateManager.writeSession('test')
    jest.runAllTimers()
    const managers = stateManager.getAllManagers()
    console.log(managers, 'managers')
    expect(managers['test']!==undefined).toBeTruthy()

    stateManager.delete('test')
    expect(stateManager.getStore().function).toEqual({})
    expect(stateManager.getStore().state).toEqual({})
    
})