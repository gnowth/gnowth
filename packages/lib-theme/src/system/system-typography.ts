import type { CSSObject } from '@emotion/css'

import { guardString } from '@gnowth/lib-utils'

import type { ScaleName, ScaleType } from '../theme/scales'
import type { TokenBase, TokenFontSize } from '../tokens/tokens'
import type { System } from './system.types'

import { TokenFont, TokenFontToVariable } from '../tokens/wip-token-font'
import { systemCompose, systemInterpolate } from './system'

type SystemFontFamily = { fontFamily?: number | string }
type SystemFontSize<Value> = { fontSize?: Value }
type SystemFontStyle = { fontStyle?: string }
type SystemFontWeight = { fontWeight?: number | string }
type SystemLetterSpacing = { letterSpacing?: string }
type SystemLineHeight = { lineHeight?: string }
type SystemTextAlign = { textAlign?: string }
type SystemTextDecoration = { textDecoration?: string }
type SystemTextTransform = { textTransform?: string }

export const systemFontFamily: () => System<SystemFontFamily> = () => (props, theme) => {
  if (guardString(props.fontFamily)) {
    return { fontFamily: props.fontFamily }
  }

  if (props.fontFamily === undefined) {
    return {}
  }

  const tokenVariable = TokenFontToVariable[props.fontFamily as TokenFont]
  const fontFamily = theme.getVariable<string | string[]>(tokenVariable)

  return fontFamily ? { fontFamily } : {}
}

export const systemFontSize: <Token extends TokenBase = TokenFontSize>(
  scale?: ScaleName | ScaleType,
) => System<SystemFontSize<Token>> =
  (scale = 'fontsize') =>
  (props, theme) =>
    systemInterpolate({ key: 'fontSize', responsive: true, scale, theme, value: props.fontSize })

export const systemFontStyle: () => System<SystemFontStyle> = () => (props) => ({
  fontStyle: props.fontStyle,
})

// TODO fix type
export const systemFontWeight: () => System<SystemFontWeight> = () => (props) =>
  ({
    fontWeight: props.fontWeight,
  }) as unknown as CSSObject

export const systemLetterSpacing: () => System<SystemLetterSpacing> = () => (props) => ({
  letterSpacing: props.letterSpacing,
})

export const systemLineHeight: () => System<SystemLineHeight> = () => (props) => ({
  lineHeight: props.lineHeight,
})

// TODO: fix type
export const systemTextAlign: () => System<SystemTextAlign> = () => (props) =>
  ({ textAlign: props.textAlign }) as unknown as CSSObject

export const systemTextDecoration: () => System<SystemTextDecoration> = () => (props) =>
  ({ textDecoration: props.textDecoration }) as unknown as CSSObject

export const systemTextTransform: () => System<SystemTextTransform> = () => (props) =>
  ({ textTransform: props.textTransform }) as unknown as CSSObject

export const systemTypography = () =>
  systemCompose(
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
