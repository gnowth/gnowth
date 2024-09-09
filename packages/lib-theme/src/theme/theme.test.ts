import { FunctionComponent } from 'react'

import { Theme } from './theme.service'

describe('Theme - component', () => {
  const SomeComponent: FunctionComponent = jest.fn()
  const OtherComponent: FunctionComponent = jest.fn()
  const parameters = {
    componentsNamespaced: { namespace1: { name1: SomeComponent }, type: { name2: OtherComponent } },
  }
  const parameters2 = {
    componentsNamespaced: { namespace1: { name2: OtherComponent }, type: { name1: SomeComponent } },
  }

  it('returns a named component from a namespace', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const Component = theme.getComponent({ component: 'name1', componentNamespace: 'namespace1' })
    expect(Component).toBe(SomeComponent)
  })

  it('returns the OtherComponent if component is OtherComponent', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const Component = theme.getComponent({ component: OtherComponent, componentNamespace: 'namespace1' })
    expect(Component).toBe(OtherComponent)
  })

  it('returns component from components override', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const Component = theme.getComponent({
      component: 'name1',
      componentNamespace: 'namespace1',
      components: { name1: OtherComponent },
    })
    expect(Component).toBe(OtherComponent)
  })

  it('return undefined if component parameter is undefined', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const Component = theme.getComponent({ componentNamespace: 'namespace1' })
    expect(Component).toBeUndefined()
  })

  it('return undefined if there is no match', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const Component = theme.getComponent({ component: 'name', componentNamespace: 'namespace1' })
    expect(Component).toBeUndefined()
  })

  it('return components from type if no namespace is defined', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const Component = theme.getComponent({ component: 'name2' })
    expect(Component).toBe(OtherComponent)
  })

  it('return undefined if namespace is not matched', () => {
    expect.assertions(1)
    const theme = new Theme()
    const Component = theme.getComponent({ component: 'name1' })
    expect(Component).toBeUndefined()
  })

  it('merges component configs', () => {
    expect.assertions(3)
    const theme = new Theme(parameters)
    const newTheme = theme.extends(parameters2)
    const Component1 = newTheme.getComponent({ component: 'name1' })
    const Component2 = newTheme.getComponent({ component: 'name2' })
    expect(Component1).toBe(SomeComponent)
    expect(Component2).toBe(OtherComponent)
    expect(theme).not.toBe(newTheme)
  })
})

describe('Theme - media', () => {
  const parameters = { medias: { name1: 'media1' } }
  const parameters2 = { medias: { name2: 'media2' } }

  it('returns a named media', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const media = theme.getMedia('name1')
    expect(media).toBe('media1')
  })

  it('return undefined if media is not found', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const media = theme.getMedia('name2')
    expect(media).toBeUndefined()
  })

  it('merges media configs', () => {
    expect.assertions(3)
    const theme = new Theme(parameters)
    const newTheme = theme.extends(parameters2)
    const media1 = newTheme.getMedia('name1')
    const media2 = newTheme.getMedia('name2')
    expect(media1).toBe('media1')
    expect(media2).toBe('media2')
    expect(theme).not.toBe(newTheme)
  })
})

describe('Theme - palette', () => {
  const parameters = {
    palettes: [
      {
        base: '#fff' as const,
        colors: [
          { darkContrast: true, hex: '#eee', name: '300' } as const,
          { darkContrast: false, hex: '#ccc', name: '500' } as const,
        ],
        name: 'primary',
      },
      {
        base: '#000' as const,
        colors: [{ darkContrast: false, hex: '#111', name: '500' } as const],
        name: 'textPrimary',
      },
      {
        base: '#999' as const,
        colors: [{ darkContrast: false, hex: '#aaa', name: '500' } as const],
        name: 'textInverse',
      },
      { name: 'reference', reference: 'textInverse' },
    ],
  }
  const parameters2 = {
    palettes: [
      {
        base: '#fff' as const,
        colors: [{ darkContrast: true, hex: '#555', name: '500' } as const],
        name: 'primary',
      },
    ],
  }
  const parameter3 = {}

  it('returns a named color for given weight', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const color = theme.getPaletteColor({ palette: 'primary', paletteWeight: '300' })
    expect(color).toBe('#eee')
  })

  it('returns a named color for default weight', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const color = theme.getPaletteColor({ palette: 'primary' })
    expect(color).toBe('#ccc')
  })

  it('returns undefined if no palette is set', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const color = theme.getPaletteColor({})
    expect(color).toBeUndefined()
  })

  it('returns undefined if palette is not found', () => {
    expect.assertions(1)
    const theme = new Theme()
    const color = theme.getPaletteColor({ palette: 'primary1' })
    expect(color).toBeUndefined()
  })

  it('returns undefined if weight is not found', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const color = theme.getPaletteColor({ palette: 'primary', paletteWeight: '50' })
    expect(color).toBeUndefined()
  })

  it('returns textPrimary of weight 500 if paletteForContrast is true and palette darkContrast is true', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const color = theme.getPaletteColor({
      palette: 'primary',
      paletteForContrast: true,
      paletteWeight: '300',
    })
    expect(color).toBe('#111')
  })

  it('returns textInverse of weight 500 if paletteForContrast is true and palette darkContrast is false', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const color = theme.getPaletteColor({
      palette: 'primary',
      paletteForContrast: true,
      paletteWeight: '500',
    })
    expect(color).toBe('#aaa')
  })

  it('returns color via reference', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const color = theme.getPaletteColor({ palette: 'reference' })
    expect(color).toBe('#aaa')
  })

  it('merges palette configs', () => {
    expect.assertions(3)
    const theme = new Theme(parameters)
    const newTheme = theme.extends(parameters2).extends(parameter3)
    const color1 = newTheme.getPaletteColor({ palette: 'reference' })
    const color2 = newTheme.getPaletteColor({ palette: 'primary' })
    expect(color1).toBe('#aaa')
    expect(color2).toBe('#555')
    expect(theme).not.toBe(newTheme)
  })
})

describe('Theme - scale', () => {
  const parameters = { scales: { name1: { md: 'medium' }, name2: { lg: 'large' } } }
  const parameters2 = { scales: { name1: { sm: 'small' } } }
  const parameters3 = { scales: { name1: jest.fn().mockReturnValue('mocked') } }
  const parameters4 = {
    scales: { name1: { md: { value1: 'val1' }, none: { value2: 'val2' }, responsive: true } },
  }

  it('returns a scale token', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const item = theme.getScaleItem({ scale: 'name1', scaleToken: 'md' })
    expect(item).toBe('medium')
  })

  it('return scale item if scale is a function', () => {
    expect.assertions(1)
    const theme = new Theme(parameters3)
    const item = theme.getScaleItem({ scale: 'name1', scaleToken: 'sm' })
    expect(item).toBe('mocked')
  })

  it('return undefined if scale token is not found', () => {
    expect.assertions(1)
    const theme = new Theme()
    const item = theme.getScaleItem({ scale: 'name1', scaleToken: 'sm' })
    expect(item).toBeUndefined()
  })

  it('returns undefined if scale is not defined', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const item = theme.getScaleItem({ scaleToken: 'md' })
    expect(item).toBeUndefined()
  })

  it('returns undefined if scaleToken is not defined', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const item = theme.getScaleItem({ scale: 'name1' })
    expect(item).toBeUndefined()
  })

  it('returns a scale token if scale is responsive', () => {
    expect.assertions(1)
    const theme = new Theme(parameters4)
    const item = theme.getScaleItem({ scale: 'name1', scaleBreakpoint: 'md', scaleToken: 'value1' })
    expect(item).toBe('val1')
  })

  it('returns undefined if scale is responsive and exact match is not found', () => {
    expect.assertions(1)
    const theme = new Theme(parameters4)
    const item = theme.getScaleItem({ scale: 'name1', scaleBreakpoint: 'sm', scaleToken: 'value1' })
    expect(item).toBeUndefined()
  })

  it('returns scale item from none if breakpoint is not provided', () => {
    expect.assertions(1)
    const theme = new Theme(parameters4)
    const item = theme.getScaleItem({ scale: 'name1', scaleToken: 'value2' })
    expect(item).toBe('val2')
  })

  it('returns a list of breakpoints for a given scale', () => {
    expect.assertions(1)
    const theme = new Theme(parameters4)
    const item = theme.getScaleBreakpoint({ scale: 'name1' })
    expect(item).toEqual(['none', 'md'])
  })

  it('returns a list of breakpoints for the provided scale', () => {
    expect.assertions(1)
    const theme = new Theme(parameters4)
    const item = theme.getScaleBreakpoint({ scale: { responsive: true, sm: {} } })
    expect(item).toEqual(['sm'])
  })

  it('returns an empty array of breakpoints if scale is not responsive', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const item = theme.getScaleBreakpoint({ scale: 'name1' })
    expect(item).toEqual([])
  })

  it('returns scale from the input scale if it is not a string', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const item = theme.getScaleItem({ scale: { md: 'small' }, scaleToken: 'md' })
    expect(item).toBe('small')
  })

  it('merges scale configs', () => {
    expect.assertions(4)
    const theme = new Theme(parameters)
    const newTheme = theme.extends(parameters2)
    const item1 = newTheme.getScaleItem({ scale: 'name2', scaleToken: 'lg' })
    const item2 = newTheme.getScaleItem({ scale: 'name1', scaleToken: 'md' })
    const item3 = newTheme.getScaleItem({ scale: 'name1', scaleToken: 'sm' })
    expect(item1).toBe('large')
    expect(item2).toBeUndefined()
    expect(item3).toBe('small')
    expect(theme).not.toBe(newTheme)
  })
})

describe('Theme - variable', () => {
  const parameters = { variables: { name1: 'variable1' } }
  const parameters2 = { variables: { name2: 'variable2' } }

  it('returns a named variable', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const variable = theme.getVariable('name1')
    expect(variable).toBe('variable1')
  })

  it('return undefined if variable is not found', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const variable = theme.getVariable('name2')
    expect(variable).toBeUndefined()
  })

  it('merges variable configs', () => {
    expect.assertions(3)
    const theme = new Theme(parameters)
    const newTheme = theme.extends(parameters2)
    const variable1 = newTheme.getVariable('name1')
    const variable2 = newTheme.getVariable('name2')
    expect(variable1).toBe('variable1')
    expect(variable2).toBe('variable2')
    expect(theme).not.toBe(newTheme)
  })
})

describe('Theme - variant', () => {
  const variantObject1 = { value: 'val1' }
  const variantObject2 = { value: 'val2' }
  const variant1: FunctionComponent = jest.fn().mockReturnValue(variantObject1)
  const variant2: FunctionComponent = jest.fn().mockReturnValue(variantObject2)
  const parameters = { variantsNamespaced: { namespace1: { name1: variant1 }, type: { name2: variant2 } } }
  const parameters2 = { variantsNamespaced: { namespace1: { name2: variant2 }, type: { name1: variant1 } } }

  it('returns a named variant from a namespace', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const props = { variant: 'name1', variantNamespace: 'namespace1' }
    const variant = theme.getPropsVariant(props)
    expect(variant).toEqual({ ...props, ...variantObject1 })
  })

  it('returns the VariantObject2 if variant is a VariantObject2', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const props = { variant: variantObject2, variantNamespace: 'namespace1' }
    const variant = theme.getPropsVariant(props)
    expect(variant).toEqual({ ...props, ...variantObject2 })
  })

  it('returns variant from variants override', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const props = { variant: 'name1', variantNamespace: 'namespace1', variants: { name1: variant2 } }
    const variant = theme.getPropsVariant(props)
    expect(variant).toEqual({ ...props, ...variantObject2 })
  })

  it('return initial props if variant parameter is undefined', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const props = { variantNamespace: 'namespace1' }
    const variant = theme.getPropsVariant(props)
    expect(variant).toEqual(props)
  })

  it('return initial props if there is no match', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const props = { variant: 'name', variantNamespace: 'namespace1' }
    const variant = theme.getPropsVariant(props)
    expect(variant).toEqual(props)
  })

  it('return initial props if namespace is not matched', () => {
    expect.assertions(1)
    const theme = new Theme()
    const props = { variant: 'name1', variantNamespace: 'other' }
    const variant = theme.getPropsVariant(props)
    expect(variant).toEqual(props)
  })

  it('returns a named variant from a fallback namespace', () => {
    expect.assertions(1)
    const theme = new Theme(parameters)
    const props = { variant: 'name1', variantNamespace: ['dontexist', 'namespace1'] }
    const variant = theme.getPropsVariant(props)
    expect(variant).toEqual({ ...props, ...variantObject1 })
  })

  it('merges variant configs', () => {
    expect.assertions(3)
    const theme = new Theme(parameters)
    const newTheme = theme.extends(parameters2)
    const props1 = { variant: 'name1', variantNamespace: 'type' }
    const props2 = { variant: 'name2', variantNamespace: 'type' }
    const variant01 = newTheme.getPropsVariant(props1)
    const variant02 = newTheme.getPropsVariant(props2)
    expect(variant01).toEqual({ ...props1, ...variantObject1 })
    expect(variant02).toEqual({ ...props2, ...variantObject2 })
    expect(theme).not.toBe(newTheme)
  })
})
