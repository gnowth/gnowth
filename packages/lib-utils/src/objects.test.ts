import { objectDefaults } from './objects'

describe('objectDefaults', () => {
  it('returns new object with same item if one argument is provided', () => {
    const item = { someValue: 'test' }
    const output = objectDefaults(item)

    expect(output).not.toBe(item)
    expect(output).toEqual(item)
  })

  it('merges the item properly', () => {
    type Item = {
      someValue: string
      otherValue?: string
      anothervalue?: string
      anyValue?: string
    }

    const item1: Item = { someValue: 'test', otherValue: 'other' }
    const item2 = { someValue: 'test2', anotherValue: 'another' }
    const item3 = { anotherValue: 'another2', anyValue: 'any' }

    const output = objectDefaults(item1, item2, item3)

    expect(output).toEqual({
      someValue: 'test',
      otherValue: 'other',
      anotherValue: 'another',
      anyValue: 'any',
    })
  })
})
