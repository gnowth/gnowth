import type { CSSObject } from '@emotion/css'
import Theme from '../theme'
import { systemCompose, systemInterpolate } from './system'

const theme = new Theme({})

describe('systemInterpolate', () => {
  it('returns empty object is no value is provided', () => {
    const cssObject = systemInterpolate({ theme, key: 'margin' })

    expect(cssObject).toEqual({})
  })

  it('returns right cssObject when value is a string', () => {
    const value = '5px'
    const cssObject = systemInterpolate({ theme, value, key: 'margin' })

    expect(cssObject.margin).toBe(value)
  })

  it('returns right cssObject when value is an object with selector', () => {
    const cssObject = systemInterpolate({ theme, value: { '&:active': '5px' }, key: 'margin' })

    expect(cssObject['&:active']).toEqual({ margin: '5px' })
  })

  it('returns right cssObject when value is an object with child', () => {
    const cssObject = systemInterpolate({ theme, value: { '& *': '5px' }, key: 'margin' })

    expect(cssObject['& *']).toEqual({ margin: '5px' })
  })
})

describe('systemCompose', () => {
  it('returns right predicate when arguments are simple functions', () => {
    const predicate = systemCompose(
      () => ({ margin: '5px' }),
      () => ({ marginLeft: '8px' }),
    )

    const cssObject = predicate({}, theme)

    expect(cssObject.margin).toBe('5px')
    expect(cssObject.marginLeft).toBe('8px')
  })

  it('returns right predicate when arguments functions returns nested output', () => {
    const predicate = systemCompose(
      () => ({ '& *': { margin: '5px' } }),
      () => ({ '& *': { marginLeft: '8px' } }),
      () => ({ marginRight: '10px' }),
    )

    const cssObject = predicate({}, theme)

    expect((cssObject['& *'] as CSSObject).margin).toBe('5px')
    expect((cssObject['& *'] as CSSObject).marginLeft).toBe('8px')
    expect(cssObject.marginRight).toBe('10px')
  })
})
