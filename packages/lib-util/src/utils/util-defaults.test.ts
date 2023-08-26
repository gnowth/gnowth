import { utilDefaults } from './util-defaults'

describe('utilDefaults', () => {
  it('returns an object if no argument is provided', () => {
    const output = utilDefaults()

    expect(output).toEqual({})
  })

  it('returns new object with same data if one argument is provided', () => {
    const data: Record<string, unknown> | undefined = { someValue: 'test' }
    const output = utilDefaults(data)

    expect(output).not.toBe(data)
    expect(output).toEqual(data)
  })

  it('merges the data properly', () => {
    interface Data {
      someValue: string
      otherValue?: string
      anothervalue?: string
      anyValue?: string
    }

    const data1: Data | undefined = { someValue: 'test', otherValue: 'other' }
    const data2 = { someValue: 'test2', anotherValue: 'another' }
    const data3 = { anotherValue: 'another2', anyValue: 'any' }

    const output = utilDefaults(data1, data2, data3)

    expect(output).toEqual({
      someValue: 'test',
      otherValue: 'other',
      anotherValue: 'another',
      anyValue: 'any',
    })
  })

  it('merges the data properly even if first item is undefined', () => {
    interface Data {
      someValue: string
      otherValue?: string
      anothervalue?: string
      anyValue?: string
    }

    const data1: Data | undefined = undefined
    const data2 = { someValue: 'test2', anotherValue: 'another' }
    const data3 = { anotherValue: 'another2', anyValue: 'any' }

    const output = utilDefaults<Data>(data1, data2, data3)

    expect(output).toEqual({
      someValue: 'test2',
      anotherValue: 'another',
      anyValue: 'any',
    })
  })
})
