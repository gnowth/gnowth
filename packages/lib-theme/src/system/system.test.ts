import { describe, expect, it } from '@jest/globals'

import { Theme } from '../theme/theme'
import { systemCompose, systemMake } from './system'

const theme = new Theme()

describe('systemBuild', () => {
  it('returns empty object is no value is provided', () => {
    expect.assertions(1)

    const cssObject = systemMake({ key: 'margin' })()({}, theme)

    expect(cssObject).toStrictEqual({})
  })

  it('returns right cssObject when value is a string', () => {
    expect.assertions(1)

    const margin = '5px'
    const cssObject = systemMake({ key: 'margin' })()({ margin }, theme)

    expect(cssObject.margin).toBe(margin)
  })

  it('returns right cssObject when value is an object with selector', () => {
    expect.assertions(1)

    const margin = '5px'
    const cssObject = systemMake({ key: 'margin' })()({ margin: { '&:active': margin } }, theme)

    expect(cssObject['&:active']).toStrictEqual({ margin })
  })

  it('returns right cssObject when value is an object with child', () => {
    expect.assertions(1)

    const margin = '5px'
    const cssObject = systemMake({ key: 'margin' })()({ margin: { '& *': margin } }, theme)

    expect(cssObject['& *']).toStrictEqual({ margin })
  })

  it('returns right cssObject when value is an object with breakpoint', () => {
    expect.assertions(1)

    const margin = '5px'
    const cssObject = systemMake({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
    })()({ margin: { md: margin } }, theme)

    expect(cssObject).toStrictEqual({ '@media(min-width: 45em)': { margin } })
  })

  it('returns right cssObject when value is an object with selector and nested breakpoint', () => {
    expect.assertions(1)

    const margin = '5px'
    const cssObject = systemMake({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
    })()({ margin: { '&:active': { md: margin } } }, theme)

    expect(cssObject).toStrictEqual({ '&:active': { '@media(min-width: 45em)': { margin } } })
  })

  it('returns right cssObject when value is a string and scale is responsive', () => {
    expect.assertions(1)

    const margin = '5px'
    const cssObject = systemMake({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
      scale: { md: { sm: '6px' }, none: { sm: '5px' }, responsive: true },
    })()({ margin }, theme)

    expect(cssObject.margin).toBe(margin)
  })

  it('returns right cssObject when value is a token and scale is responsive', () => {
    expect.assertions(1)

    const cssObject = systemMake({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
      scale: { md: { sm: '6px' }, none: { sm: '5px' }, responsive: true },
    })()({ margin: 'sm' }, theme)

    expect(cssObject).toStrictEqual({ '@media(min-width: 45em)': { margin: '6px' }, margin: '5px' })
  })

  it('returns right cssObject when value is and object with token and scale is responsive', () => {
    expect.assertions(1)

    const cssObject = systemMake({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
      scale: { md: { sm: '6px' }, none: { sm: '5px' }, responsive: true },
    })()({ margin: { '& *': 'sm' } }, theme)

    expect(cssObject).toStrictEqual({
      '& *': { '@media(min-width: 45em)': { margin: '6px' }, margin: '5px' },
    })
  })

  it('returns right cssObject when value has breakpoint, token and scale is responsive', () => {
    expect.assertions(1)

    const cssObject = systemMake({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
      scale: { md: { sm: '6px' }, none: { sm: '5px' }, responsive: true },
    })()({ margin: { md: 'sm' } }, theme)

    expect(cssObject).toStrictEqual({
      '@media(min-width: 45em)': { margin: '6px' },
    })
  })
})

describe('systemCompose', () => {
  it('returns right predicate when arguments are simple functions', () => {
    expect.assertions(2)

    const predicate = systemCompose(
      () => ({ margin: '5px' }),
      () => ({ marginLeft: '8px' }),
    )
    const cssObject = predicate({}, theme)

    expect(cssObject.margin).toBe('5px')
    expect(cssObject.marginLeft).toBe('8px')
  })

  it('returns right predicate when arguments functions returns nested output', () => {
    expect.assertions(5)

    const margin = { margin: '5px' }
    const marginLeft = { marginLeft: '8px' }
    const marginRight = { marginRight: '10px' }
    const predicate = systemCompose(
      () => ({ '@media(min-width: 45em)': { '& *': margin } }),
      () => ({ '@media(min-width: 45em)': { '& *': marginLeft } }),
      () => ({ '& *': margin }),
      () => ({ '& *': marginLeft }),
      () => marginRight,
    )
    const cssObject = predicate({}, theme)

    expect(cssObject['@media(min-width: 45em)']).toStrictEqual({ '& *': expect.objectContaining(margin) })
    expect(cssObject['@media(min-width: 45em)']).toStrictEqual({ '& *': expect.objectContaining(marginLeft) })
    expect(cssObject['& *']).toStrictEqual(expect.objectContaining(margin))
    expect(cssObject['& *']).toStrictEqual(expect.objectContaining(marginLeft))
    expect(cssObject).toStrictEqual(expect.objectContaining(marginRight))
  })
})
