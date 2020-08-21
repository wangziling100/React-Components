import {
  IDict,
  checkLocal,
  checkSession,
  checkStorage,
  StoreManager,
  createLocal,
  createSession,
  readLocal,
  readSession,
  writeLocal,
  writeSession,
  updateLocal,
  updateSession
} from '../index'

test('check empty storage', () => {
  expect(checkLocal('test', null)).toBe(false)
  expect(checkSession('test', null)).toBe(false)
  expect(checkLocal('test', 'key')).toBe(false)
  expect(checkSession('test', 'key')).toBe(false)
  const manager = new StoreManager('test', {'key':{}})
  expect(manager.checkLocal()).toBe(false)
  expect(manager.checkSession()).toBe(false)
  localStorage.clear()
  sessionStorage.clear()
});

test('create storage', () => {
  const store = {'key':{}}
  expect(createLocal('local', store)).toBe(true)
  expect(createSession('session', store)).toBe(true)
  const manager = new StoreManager('class', store)
  expect(manager.createLocal()).toBe(true)
  expect(manager.createSession()).toBe(true)
  expect(readLocal('local')).toEqual(store)
  expect(readSession('session')).toEqual(store)
  expect(manager.readLocal()).toEqual(store)
  expect(manager.readSession()).toEqual(store)

  localStorage.clear()
  sessionStorage.clear()
})

test('write storage', ()=>{
  const store1 = {'key':{}}
  const store2 = {'key1':{}, 'key2':1, 'key3':'abc'}
  expect(writeLocal('local', store1)).toEqual(true)
  expect(readLocal('local')).toEqual(store1)
  expect(writeLocal('local', store2)).toEqual(true)
  expect(readLocal('local')).toEqual(store2)
  expect(readLocal('local', 'key1')).toEqual({})
  expect(readLocal('local', 'key2')).toEqual(1)
  expect(readLocal('local', ['key2', 'key3'])).toEqual({'key2':1, 'key3':'abc'})
  expect(writeSession('sess', store1)).toEqual(true)
  expect(readSession('sess')).toEqual(store1)
  expect(writeSession('sess', store2)).toEqual(true)
  expect(readSession('sess', 'key1')).toEqual({})
  expect(readSession('sess', 'key2')).toEqual(1)
  expect(readSession('sess', ['key2', 'key3'])).toEqual({'key2':1, 'key3':'abc'})
  const manager = new StoreManager('test', {'key1':{}})
  expect(manager.writeLocal(store2, false)).toBe(true)
  expect(manager.readLocal('key1')).toEqual({})
  expect(manager.readLocal(['key2','key3'])).toEqual({'key2':1, 'key3':'abc'})
  expect(manager.readLocal(null)).toEqual(store2)
  expect(manager.writeLocal(store1, false)).toBe(false)
  expect(manager.readLocal(null)).toEqual(store2)
  expect(manager.writeLocal(store1, true)).toBe(true)
  expect(manager.readLocal(null)).toEqual(store1)

  expect(manager.writeSession(store2, false)).toBe(true)
  expect(manager.readSession('key1')).toEqual({})
  expect(manager.readSession(['key2', 'key3'])).toEqual({'key2': 1, 'key3':'abc'})
  expect(manager.readSession(null)).toEqual(store2)
  expect(manager.writeSession(store1, false)).toBe(false)
  expect(manager.readSession(null)).toEqual(store2)
  expect(manager.writeSession(store1, true)).toBe(true)
  expect(manager.readSession(null)).toEqual(store1)

  localStorage.clear()
  sessionStorage.clear()
})

test('read storage', () => {
  const store1 = {'key': {}}
  const store2 = {'key1': {}, 'key2':1}
  writeLocal('local', store2)
  expect(readLocal('local', null, 'key1', store1, true)).toEqual(store2)
  expect(readLocal('local', null, ['key1', 'key2'], store1, true)).toEqual(store2)
  expect(readLocal('wrong')).toEqual({})

  writeLocal('local', store2)
  expect(readLocal('wrong', null, null, {}, false)).toEqual({})
  expect(readLocal('local', 'key3')).toBe(null)
  expect(readLocal('local', ['key1', 'key2', 'key3'])).toBe(null)
  expect(readLocal('local')).toEqual(store2)
  expect(readLocal('local', null, 'key3', store1, true)).toEqual(store1)
  writeLocal('local', store2)
  expect(readLocal('local', null, ['key1', 'key2', 'key3'], store1, true)).toEqual(store1)

  writeSession('sess', store2)
  expect(readSession('sess', null, 'key1', store1, true)).toEqual(store2)
  expect(readSession('sess', null, ['key1', 'key2'], store1, true)).toEqual(store2)
  expect(readSession('wrong')).toEqual({})

  writeSession('sess', store2)
  expect(readSession('wrong', null, null, {}, false)).toEqual({})
  expect(readSession('sess', 'key3')).toBe(null)
  expect(readSession('sess', ['key1', 'key2', 'key3'])).toBe(null)
  expect(readSession('sess')).toEqual(store2)
  expect(readSession('sess', null, 'key3', store1, true)).toEqual(store1)
  writeSession('sess', store2)
  expect(readSession('sess', null, ['key1', 'key2', 'key3'], store1, true)).toEqual(store1)
  localStorage.clear()
  sessionStorage.clear()
})

test('update storage', ()=>{
  const store0 = {}
  const store1 = {'key': {}}
  const store2 = {'key1': 'abc', 'key2':1, 'key3': {}}
  const store3 = {'key': {}, 'key1':'abc', 'key2':1, 'key3':{}}
  const store4 = {'key': {'a': 1}}
  writeLocal('local', store1)
  expect(updateLocal('local', store2)).toEqual(true)
  expect(readLocal('local')).toEqual(store3)
  writeLocal('local', store1)
  expect(updateLocal('local', store4)).toEqual(true)
  expect(readLocal('local')).toEqual(store4)
  writeLocal('local', store0)
  expect(updateLocal('local', store4)).toEqual(true)
  expect(readLocal('local')).toEqual(store4)
  
  writeLocal('local', store0)
  expect(updateLocal('local', store0, null, store1, true)).toEqual(true)
  expect(readLocal('local')).toEqual({})
  writeLocal('local', store0)
  expect(updateLocal('local', store0, 'key', store1, true)).toEqual(true)
  expect(readLocal('local')).toEqual(store1)
  writeLocal('local', store0)
  expect(updateLocal('local', store0, ['key1','key2'], store1, true)).toEqual(true)
  expect(readLocal('local')).toEqual(store1)

  let manager = new StoreManager('test', store0)
  manager.writeLocal(store1)
  expect(manager.updateLocal(store2, true)).toEqual(true)
  expect(manager.readLocal()).toEqual(store3)

  manager = new StoreManager('test', store1)
  manager.writeLocal(store0)
  expect(manager.updateLocal(store2, true)).toEqual(true)
  expect(manager.readLocal()).toEqual(store3)

  writeSession('sess', store1)
  expect(updateSession('sess', store2)).toEqual(true)
  expect(readSession('sess')).toEqual(store3)
  writeSession('sess', store1)
  expect(updateSession('sess', store4)).toEqual(true)
  expect(readSession('sess')).toEqual(store4)
  writeSession('sess', store0)
  expect(updateSession('sess', store4)).toEqual(true)
  expect(readSession('sess')).toEqual(store4)
  
  writeSession('sess', store0)
  expect(updateSession('sess', store0, null, store1, true)).toEqual(true)
  expect(readSession('sess')).toEqual({})
  writeSession('sess', store0)
  expect(updateSession('sess', store0, 'key', store1, true)).toEqual(true)
  expect(readSession('sess')).toEqual(store1)
  writeSession('sess', store0)
  expect(updateSession('sess', store0, ['key1','key2'], store1, true)).toEqual(true)
  expect(readSession('sess')).toEqual(store1)

  manager = new StoreManager('test', store0)
  manager.writeSession(store1)
  expect(manager.updateSession(store2, true)).toEqual(true)
  expect(manager.readSession()).toEqual(store3)

  manager = new StoreManager('test', store1)
  manager.writeSession(store0)
  expect(manager.updateSession(store2, true)).toEqual(true)
  expect(manager.readSession()).toEqual(store3)

  manager = new StoreManager('test', store1)
  manager.createSession()
  expect(manager.readSession()).toEqual(store1)
  manager.writeSession(store0, true)
  expect(manager.updateSession(store2, false)).toEqual(true)
  expect(manager.readSession()).toEqual(store2)

})