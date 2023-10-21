import type { Theme, VariantType } from '@gnowth/lib-theme'
import type { PropsUIButton } from '@gnowth/lib-view'
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
export const text: VariantType<PropsUIButton> = (props) => ({
  backgroundColor: interpolateColor(props.theme),
  border: '0',
  borderColor: interpolateColor(props.theme),
  borderRadius: '3px',
  color: interpolateColorFlat(props.theme, props.palette, '*', true),
  cursor: {
    '&': 'pointer',
    [TokenSelector.disabled]: 'auto',
  },
  minWidth: '8rem',
  paddingBottom: '11px',
  paddingLeft: 'sm',
  paddingRight: 'sm',
  paddingTop: '11px',
  progressPalette: props.palette,
  textVariant: 'button',
})

export const outlined: VariantType<PropsUIButton> = (props) => ({
  ...text(props),
  border: '1px solid',
  borderColor: interpolateColorFlat(props.theme, props.palette),
})

export const navigation: VariantType<PropsUIButton> = (props) => ({
  ...text(props),
  borderBottom: {
    '&.active': `2px solid ${
      props.theme.getPaletteColor({
        palette: props.palette,
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

export const contained: VariantType<PropsUIButton> = (props) => ({
  ...outlined(props),
  backgroundColor: interpolateColorFlat(props.theme, props.palette),
  color: interpolateColorFlat(props.theme, props.palette, '*'),
  progressPalette: props.palette,
  progressPaletteForContrast: true,
})

export const flat: VariantType<PropsUIButton> = (props) => ({
  ...contained(props),
  borderRadius: '0',
})

export const raised: VariantType<PropsUIButton> = (props) => ({
  ...flat(props),
  boxShadow: 'material2',
})

export const icon: VariantType<PropsUIButton> = (props) => ({
  backgroundColor: interpolateColor(props.theme),
  border: '0',
  color: interpolateColorFlat(props.theme, props.palette, '*', true),
  cursor: {
    '&': 'pointer',
    [TokenSelector.disabled]: 'auto',
  },
  iconHidden: !props.progressHidden,
  iconSize: 'sm',
  padding: 'xxs',
  progressPalette: props.palette,
  progressSize: props.iconSize ?? 'sm',
  textHidden: true,
})

// TODO: allow it to grow with iconSize
export const fab: VariantType<PropsUIButton> = (props) => ({
  ...icon(props),
  backgroundColor: interpolateColorFlat(props.theme, props.palette),
  border: '1px solid',
  borderColor: interpolateColorFlat(props.theme, props.palette),
  borderRadius: '50%',
  boxShadow: 'materialHover3',
  color: interpolateColorFlat(props.theme, props.palette, '*'),
  iconSize: 'md',
  padding: '20%',
  progressPaletteForContrast: true,
  progressSize: props.iconSize ?? 'md',
})
