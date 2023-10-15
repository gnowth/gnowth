import type { Theme, VariantType } from '@gnowth/lib-theme'
import type { PropsUIButton, VariantUIButton } from '@gnowth/lib-view'
import { TokenSelector } from '@gnowth/lib-token'
import { guardUndefined, objectOmitBy } from '@gnowth/lib-utils'

// TODO find a way to abstract it across in a library
function select(selector = '', child?: string) {
  return child ? `&& ${child}${selector}` : `&${selector}`
}

function interpolateColorFlat(theme: Theme, palette?: string, child?: string, forTextStyle = false) {
  return objectOmitBy(
    {
      [select('', child)]: theme.getPaletteColor({
        palette,
        paletteForContrast: !!child && !forTextStyle,
        paletteWeight: '500',
      }),

      [select(TokenSelector.hover, child)]: theme.getPaletteColor({
        palette,
        paletteForContrast: !!child && !forTextStyle,
        paletteWeight: '400',
      }),

      [select(TokenSelector.focus, child)]: theme.getPaletteColor({
        palette,
        paletteForContrast: !!child && !forTextStyle,
        paletteWeight: '700',
      }),

      [select(TokenSelector.disabled, child)]: theme.getPaletteColor({
        palette: 'gray',
        paletteWeight: child ? '800' : '200',
      }),
    },
    guardUndefined,
  ) as Record<string, string>
}

function interpolateColor(theme: Theme, color = 'white') {
  return objectOmitBy(
    {
      '&': color,

      [select(TokenSelector.hover)]: theme.getPaletteColor({
        palette: 'gray',
        paletteWeight: '50',
      }),

      [select(TokenSelector.disabled)]: theme.getPaletteColor({
        palette: 'gray',
        paletteWeight: '200',
      }),
    },
    guardUndefined,
  ) as Record<string, string>
}

// TODO use theme token for border size, border radius, boxShadow
export const text: VariantType<VariantUIButton> = (
  theme: Theme,
  propsWithDefault: PropsUIButton,
): VariantUIButton => ({
  backgroundColor: interpolateColor(theme),
  border: '0',
  borderColor: interpolateColor(theme),
  borderRadius: '3px',
  color: interpolateColorFlat(theme, propsWithDefault.palette, '*', true),
  cursor: {
    '&': 'pointer',
    [TokenSelector.disabled]: 'auto',
  },
  minWidth: '8rem',
  paddingBottom: '11px',
  paddingLeft: 'sm',
  paddingRight: 'sm',
  paddingTop: '11px',
  progressPalette: propsWithDefault.palette,
  textVariant: 'button',
})

export const outlined: VariantType<VariantUIButton> = (
  theme: Theme,
  propsWithDefault: PropsUIButton,
): VariantUIButton => ({
  ...text(theme, propsWithDefault),
  border: '1px solid',
  borderColor: interpolateColorFlat(theme, propsWithDefault.palette),
})

export const navigation: VariantType<VariantUIButton> = (
  theme: Theme,
  propsWithDefault: PropsUIButton,
): VariantUIButton => ({
  ...text(theme, propsWithDefault),
  borderBottom: {
    '&.active': `2px solid ${
      theme.getPaletteColor({
        palette: propsWithDefault.palette,
      }) ?? ''
    }`,
  },
  borderRadius: '0',
  minWidth: '6rem',
  paddingBottom: 'md',
  paddingLeft: 'xs',
  paddingRight: 'xs',
  paddingTop: 'md',
})

export const contained: VariantType<VariantUIButton> = (
  theme: Theme,
  propsWithDefault: PropsUIButton,
): VariantUIButton => ({
  ...outlined(theme, propsWithDefault),
  backgroundColor: interpolateColorFlat(theme, propsWithDefault.palette),
  color: interpolateColorFlat(theme, propsWithDefault.palette, '*'),
  progressPalette: propsWithDefault.palette,
  progressPaletteForContrast: true,
})

export const flat: VariantType<VariantUIButton> = (
  theme: Theme,
  propsWithDefault: PropsUIButton,
): VariantUIButton => ({
  ...contained(theme, propsWithDefault),
  borderRadius: '0',
})

export const raised: VariantType<VariantUIButton> = (
  theme: Theme,
  propsWithDefault: PropsUIButton,
): VariantUIButton => ({
  ...flat(theme, propsWithDefault),
  boxShadow: 'material2',
})

export const icon: VariantType<VariantUIButton> = (
  theme: Theme,
  propsWithDefault: PropsUIButton,
): VariantUIButton => ({
  backgroundColor: interpolateColor(theme),
  border: '0',
  color: interpolateColorFlat(theme, propsWithDefault.palette, '*', true),
  cursor: {
    '&': 'pointer',
    [TokenSelector.disabled]: 'auto',
  },
  iconHidden: !propsWithDefault.progressHidden,
  iconSize: 'sm',
  padding: 'xxs',
  progressPalette: propsWithDefault.palette,
  progressSize: propsWithDefault.iconSize ?? 'sm',
  textHidden: true,
})

// TODO: allow it to grow with iconSize
export const fab: VariantType<VariantUIButton> = (
  theme: Theme,
  propsWithDefault: PropsUIButton,
): VariantUIButton => ({
  ...icon(theme, propsWithDefault),
  backgroundColor: interpolateColorFlat(theme, propsWithDefault.palette),
  border: '1px solid',
  borderColor: interpolateColorFlat(theme, propsWithDefault.palette),
  borderRadius: '50%',
  boxShadow: 'materialHover3',
  color: interpolateColorFlat(theme, propsWithDefault.palette, '*'),
  iconSize: 'md',
  padding: '20%',
  progressPaletteForContrast: true,
  progressSize: propsWithDefault.iconSize ?? 'md',
})
