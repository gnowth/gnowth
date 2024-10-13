import { describe, expect, it, jest } from '@jest/globals'

import { PlatformDependency } from '../core/platform'
import { mockPlatform } from '../tests/mocks'
import { DataService } from './data'

describe('dataService', () => {
  it('gets and sets', async () => {
    expect.assertions(2)

    const platform = await mockPlatform()
    const dataService = await platform.providerGet<DataService>({ name: PlatformDependency.dataService })

    expect(dataService.get('name')).toBeUndefined()

    dataService.set('name', 'content')

    expect(dataService.get('name')).toBe('content')
  })

  it('subscribes', async () => {
    expect.assertions(6)

    const platform = await mockPlatform()
    const dataService = await platform.providerGet<DataService>({ name: PlatformDependency.dataService })

    const setter1 = jest.fn()
    const setter2 = jest.fn()
    dataService.subscribe('name', setter1)
    dataService.subscribe('name', setter2)

    expect(setter1).not.toHaveBeenCalled()
    expect(setter2).not.toHaveBeenCalled()

    dataService.set('name', 'content')

    expect(setter1).toHaveBeenCalledWith('content')
    expect(setter2).toHaveBeenCalledWith('content')

    dataService.set('name2', 'content2')

    expect(setter1).not.toHaveBeenCalledWith('content2')
    expect(setter2).not.toHaveBeenCalledWith('content2')
  })

  it('subscribes but it does not trigger when same data is set', async () => {
    expect.assertions(3)

    const platform = await mockPlatform()
    const dataService = await platform.providerGet<DataService>({ name: PlatformDependency.dataService })

    const setter1 = jest.fn()
    dataService.subscribe('name', setter1)

    expect(setter1).not.toHaveBeenCalled()

    dataService.set('name', 'content')

    expect(setter1).toHaveBeenCalledWith('content')

    dataService.set('name', 'content')

    expect(setter1).toHaveBeenNthCalledWith(1, 'content')
  })

  it('makes getter', async () => {
    expect.assertions(4)

    const platform = await mockPlatform()
    const dataService = await platform.providerGet<DataService>({ name: PlatformDependency.dataService })
    const getter = dataService.makeGet('name')

    expect(getter()).toBeUndefined()
    expect(dataService.makeGet('name')).toBe(getter)

    dataService.set('name', 'content')

    expect(getter()).toBe('content')
    expect(getter()).toBe('content')
  })

  it('makes setter', async () => {
    expect.assertions(3)

    const platform = await mockPlatform()
    const dataService = await platform.providerGet<DataService>({ name: PlatformDependency.dataService })
    const setter = dataService.makeSet('name')

    expect(dataService.get('name')).toBeUndefined()
    expect(dataService.makeSet('name')).toBe(setter)

    setter('content')

    expect(dataService.get('name')).toBe('content')
  })

  it('makes subscriber', async () => {
    expect.assertions(7)

    const platform = await mockPlatform()
    const dataService = await platform.providerGet<DataService>({ name: PlatformDependency.dataService })
    const subscriber = dataService.makeSubscribe('name')

    expect(dataService.makeSubscribe('name')).toBe(subscriber)

    const setter1 = jest.fn()
    const setter2 = jest.fn()
    subscriber(setter1)
    subscriber(setter2)

    expect(setter1).not.toHaveBeenCalled()
    expect(setter2).not.toHaveBeenCalled()

    dataService.set('name', 'content')

    expect(setter1).toHaveBeenCalledWith('content')
    expect(setter2).toHaveBeenCalledWith('content')

    dataService.set('name2', 'content2')

    expect(setter1).not.toHaveBeenCalledWith('content2')
    expect(setter2).not.toHaveBeenCalledWith('content2')
  })
})
