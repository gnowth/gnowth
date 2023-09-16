import type { CSSObject } from '@emotion/css'
import type {
  SystemFontFamily,
  SystemFontSize,
  SystemFontStyle,
  SystemFontWeight,
  SystemLetterSpacing,
  SystemLineHeight,
  SystemTextAlign,
  SystemTextDecoration,
  SystemTextTransform,
  SystemTypography,
  Theme,
} from '@gnowth/lib-types'
import _ from 'lodash'
import { TokenFont, TokenFontToVariable } from '@gnowth/lib-token'

import type { ThemeScale } from '../types'
import { systemCompose, systemInterpolate } from './system'

export function systemFontFamily() {
  return (props: SystemFontFamily, theme: Theme): CSSObject => {
    if (_.isString(props.fontFamily)) return { fontFamily: props.fontFamily }
    if (props.fontFamily === undefined) return {}

    const tokenVariable = TokenFontToVariable[props.fontFamily as TokenFont]
    const fontFamily = theme.getVariable<string | string[]>(tokenVariable)

    return fontFamily ? { fontFamily } : {}
  }
}

export function systemFontSize(scale: ThemeScale | string = 'fontsize') {
  return (props: SystemFontSize, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'fontSize', responsive: true, scale, theme, value: props.fontSize })
}

export function systemFontStyle() {
  return (props: SystemFontStyle): CSSObject => ({
    fontStyle: props.fontStyle,
  })
}

// TODO fix type
export function systemFontWeight() {
  return (props: SystemFontWeight): CSSObject =>
    ({
      fontWeight: props.fontWeight,
    }) as unknown as CSSObject
}

export function systemLetterSpacing() {
  return (props: SystemLetterSpacing): CSSObject => ({
    letterSpacing: props.letterSpacing,
  })
}

export function systemLineHeight() {
  return (props: SystemLineHeight): CSSObject => ({
    lineHeight: props.lineHeight,
  })
}

// TODO: fix type
export function systemTextAlign() {
  return (props: SystemTextAlign): CSSObject => ({ textAlign: props.textAlign }) as unknown as CSSObject
}

export function systemTextDecoration() {
  return (props: SystemTextDecoration): CSSObject =>
    ({ textDecoration: props.textDecoration }) as unknown as CSSObject
}

export function systemTextTransform() {
  return (props: SystemTextTransform): CSSObject =>
    ({ textTransform: props.textTransform }) as unknown as CSSObject
}

export function systemTypography(): (props: SystemTypography, theme: Theme) => CSSObject {
  return systemCompose<SystemTypography>(
    systemFontFamily(),
    systemFontSize(),
    systemFontStyle(),
    systemFontWeight(),
    systemLetterSpacing(),
    systemLineHeight(),
    systemTextAlign(),
    systemTextDecoration(),
    systemTextTransform(),
  )
}
