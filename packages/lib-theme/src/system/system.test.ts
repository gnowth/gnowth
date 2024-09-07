import type { CSSObject } from '@emotion/serialize'

import { Theme } from '../theme/theme'
import { systemBuild, systemCompose } from './system'

const theme = new Theme()

describe('systemBuild', () => {
  it('returns empty object is no value is provided', () => {
    const cssObject = systemBuild({ key: 'margin' })()({}, theme)
    expect(cssObject).toEqual({})
  })

  it('returns right cssObject when value is a string', () => {
    const margin = '5px'
    const cssObject = systemBuild({ key: 'margin' })()({ margin }, theme)
    expect(cssObject.margin).toBe(margin)
  })

  it('returns right cssObject when value is an object with selector', () => {
    const margin = '5px'
    const cssObject = systemBuild({ key: 'margin' })()({ margin: { '&:active': margin } }, theme)
    expect(cssObject['&:active']).toEqual({ margin })
  })

  it('returns right cssObject when value is an object with child', () => {
    const margin = '5px'
    const cssObject = systemBuild({ key: 'margin' })()({ margin: { '& *': margin } }, theme)
    expect(cssObject['& *']).toEqual({ margin })
  })

  it('returns right cssObject when value is an object with breakpoint', () => {
    const margin = '5px'
    const cssObject = systemBuild({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
    })()({ margin: { md: margin } }, theme)
    expect(cssObject).toEqual({ '@media(min-width: 45em)': { margin } })
  })

  it('returns right cssObject when value is an object with selector and nested breakpoint', () => {
    const margin = '5px'
    const cssObject = systemBuild({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
    })()({ margin: { '&:active': { md: margin } } }, theme)
    expect(cssObject).toEqual({ '&:active': { '@media(min-width: 45em)': { margin } } })
  })

  it('returns right cssObject when value is a string and scale is responsive', () => {
    const margin = '5px'
    const cssObject = systemBuild({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
      scale: { md: { sm: '6px' }, none: { sm: '5px' }, responsive: true },
    })()({ margin }, theme)
    expect(cssObject.margin).toBe(margin)
  })

  it('returns right cssObject when value is a token and scale is responsive', () => {
    const cssObject = systemBuild({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
      scale: { md: { sm: '6px' }, none: { sm: '5px' }, responsive: true },
    })()({ margin: 'sm' }, theme)
    expect(cssObject).toEqual({ '@media(min-width: 45em)': { margin: '6px' }, margin: '5px' })
  })

  it('returns right cssObject when value is and object with token and scale is responsive', () => {
    const cssObject = systemBuild({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
      scale: { md: { sm: '6px' }, none: { sm: '5px' }, responsive: true },
    })()({ margin: { '& *': 'sm' } }, theme)
    expect(cssObject).toEqual({ '& *': { '@media(min-width: 45em)': { margin: '6px' }, margin: '5px' } })
  })

  it('returns right cssObject when value has breakpoint, token and scale is responsive', () => {
    const cssObject = systemBuild({
      breakpointScale: { md: '45em', none: '' },
      key: 'margin',
      scale: { md: { sm: '6px' }, none: { sm: '5px' }, responsive: true },
    })()({ margin: { md: 'sm' } }, theme)
    expect(cssObject).toEqual({
      '@media(min-width: 45em)': { margin: '6px' },
    })
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
      () => ({ '@media(min-width: 45em)': { '& *': { margin: '5px' } } }),
      () => ({ '@media(min-width: 45em)': { '& *': { marginLeft: '8px' } } }),
      () => ({ '& *': { margin: '5px' } }),
      () => ({ '& *': { marginLeft: '8px' } }),
      () => ({ marginRight: '10px' }),
    )
    const cssObject = predicate({}, theme)
    expect(((cssObject['@media(min-width: 45em)'] as CSSObject)['& *'] as CSSObject).margin).toBe('5px')
    expect(((cssObject['@media(min-width: 45em)'] as CSSObject)['& *'] as CSSObject).marginLeft).toBe('8px')
    expect((cssObject['& *'] as CSSObject).margin).toBe('5px')
    expect((cssObject['& *'] as CSSObject).marginLeft).toBe('8px')
    expect(cssObject.marginRight).toBe('10px')
  })
})
