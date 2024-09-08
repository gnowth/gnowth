import type { Theme, VariantType } from '@gnowth/lib-theme'
import type { PropsUIButton } from '@gnowth/lib-view'

import { guardUndefined } from '@gnowth/lib-utils'
import * as R from 'remeda'

import { TokenSelector } from '../tokens/wip-token-selector'

// TODO find a way to abstract it across in a library
function select(selector = '', child?: string) {
  return child ? `&& ${child}${selector}` : `&${selector}`
}

function interpolateColorFlat(theme: Theme, palette?: string, child?: string, forTextStyle = false) {
  return R.omitBy(
    {
      [select('', child)]: theme.getPaletteColor({
        palette,
        paletteForContrast: !!child && !forTextStyle,
        paletteWeight: '500',
      }),

      [select(TokenSelector.disabled, child)]: theme.getPaletteColor({
        palette: 'gray',
        paletteWeight: child ? '800' : '200',
      }),

      [select(TokenSelector.focus, child)]: theme.getPaletteColor({
        palette,
        paletteForContrast: !!child && !forTextStyle,
        paletteWeight: '700',
      }),

      [select(TokenSelector.hover, child)]: theme.getPaletteColor({
        palette,
        paletteForContrast: !!child && !forTextStyle,
        paletteWeight: '400',
      }),
    },
    guardUndefined,
  ) as Record<string, string>
}

function interpolateColor(theme: Theme, color = 'white', forTextStyle = false) {
  return R.omitBy(
    {
      '&': forTextStyle ? 'transparent' : color,

      [select(TokenSelector.disabled)]: theme.getPaletteColor({
        palette: 'gray',
        paletteWeight: '200',
      }),

      [select(TokenSelector.hover)]: theme.getPaletteColor({
        palette: 'gray',
        paletteWeight: '50',
      }),
    },
    guardUndefined,
  ) as Record<string, string>
}

// TODO use theme token for border size, border radius, boxShadow
export const text: VariantType<PropsUIButton> = (props) => {
  const colorInterpolated = interpolateColor(props.theme, undefined, true)
  const height = props.theme.getScaleItem({ scale: 'buttonsize', scaleToken: props.size })
  const isExtraLarge = !!props.size && ['xxl', 'xxxl'].includes(props.size)
  return {
    backgroundColor: colorInterpolated,
    border: '0',
    borderColor: colorInterpolated,
    borderRadius: '4px',
    color: interpolateColorFlat(props.theme, props.palette, '*', true),
    cursor: {
      '&': 'pointer',
      [TokenSelector.disabled]: 'auto',
    },
    height,
    iconSize: isExtraLarge ? 'xl' : 'xs',
    layoutVariant: isExtraLarge ? 'verticalCenter' : 'horizontalCenter',
    minWidth: `calc(${height} * ${isExtraLarge ? 1.5 : 3})`,
    paddingLeft: 'xs',
    paddingRight: 'xs',
    progressPalette: props.palette,
    textVariant: 'button',
  }
}

export const navigation: VariantType<PropsUIButton> = (props) => ({
  ...text(props),
  borderBottom: '2px solid transparent',
  borderRadius: '0',
  borderTop: '2px solid transparent',
  minWidth: undefined,
  paddingLeft: 'xs',
  paddingRight: 'xs',
})

export const outlined: VariantType<PropsUIButton> = (props) => ({
  ...text(props),
  backgroundColor: interpolateColor(props.theme),
  border: '1px solid',
  borderColor: interpolateColorFlat(props.theme, props.palette),
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

export const icon: VariantType<PropsUIButton> = (props) => {
  const height = props.height ?? props.theme.getScaleItem({ scale: 'buttonsize', scaleToken: props.size })
  return {
    backgroundColor: interpolateColor(props.theme, undefined, true),
    border: '0',
    borderRadius: '50%',
    color: interpolateColorFlat(props.theme, props.palette, '*', true),
    cursor: {
      '&': 'pointer',
      [TokenSelector.disabled]: 'auto',
    },
    height,
    iconHidden: !props.progressHidden,
    iconSize: props.iconSize ?? props.size,
    progressPalette: props.palette,
    progressSize: props.iconSize ?? 'sm',
    textHidden: true,
    width: props.width ?? height,
  }
}

export const fab: VariantType<PropsUIButton> = (props) => {
  const height = props.height ?? props.theme.getScaleItem({ scale: 'buttonsize', scaleToken: props.size })
  return {
    ...icon(props),
    backgroundColor: interpolateColorFlat(props.theme, props.palette),
    border: '1px solid',
    borderColor: interpolateColorFlat(props.theme, props.palette),
    boxShadow: 'materialHover3',
    color: interpolateColorFlat(props.theme, props.palette, '*'),
    height,
    progressPaletteForContrast: true,
    progressSize: props.iconSize ?? props.size ?? 'md',
    width: props.width ?? height,
  }
}
