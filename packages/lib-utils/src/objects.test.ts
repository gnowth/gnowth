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
      anothervalue?: string
      anyValue?: string
      otherValue?: string
      someValue: string
    }

    const item1: Item = { otherValue: 'other', someValue: 'test' }
    const item2 = { anotherValue: 'another', someValue: 'test2' }
    const item3 = { anotherValue: 'another2', anyValue: 'any' }

    const output = objectDefaults(item1, item2, item3)

    expect(output).toEqual({
      anotherValue: 'another',
      anyValue: 'any',
      otherValue: 'other',
      someValue: 'test',
    })
  })
})
