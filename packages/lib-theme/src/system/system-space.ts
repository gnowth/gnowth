import type { System, SystemInterpolate, SystemUnits } from './system.types'
import type { ScaleName, ScaleType } from '../theme/theme-scale.service'
import type { TokenBase, TokenPropertyValue, TokenSpace } from '../tokens/tokens'
import { systemCompose, systemInterpolate } from './system'

type SystemMargin<Value> = { margin?: SystemInterpolate<Value> }
type SystemMarginBottom<Value> = { marginBottom?: SystemInterpolate<Value> }
type SystemMarginLeft<Value> = { marginLeft?: SystemInterpolate<Value> }
type SystemMarginRight<Value> = { marginRight?: SystemInterpolate<Value> }
type SystemMarginTop<Value> = { marginTop?: SystemInterpolate<Value> }
type SystemPadding<Value> = { padding?: SystemInterpolate<Value> }
type SystemPaddingBottom<Value> = { paddingBottom?: SystemInterpolate<Value> }
type SystemPaddingLeft<Value> = { paddingLeft?: SystemInterpolate<Value> }
type SystemPaddingRight<Value> = { paddingRight?: SystemInterpolate<Value> }
type SystemPaddingTop<Value> = { paddingTop?: SystemInterpolate<Value> }

export const systemMargin: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemMargin<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'margin', scale, theme, value: props.margin })

export const systemMarginBottom: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemMarginBottom<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'marginBottom', scale, theme, value: props.marginBottom })

export const systemMarginLeft: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemMarginLeft<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'marginLeft', scale, theme, value: props.marginLeft })

export const systemMarginRight: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemMarginRight<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'marginRight', scale, theme, value: props.marginRight })

export const systemMarginTop: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemMarginTop<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'marginTop', scale, theme, value: props.marginTop })

export const systemPadding: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemPadding<Token | `${number}%`>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'padding', scale, theme, value: props.padding })

export const systemPaddingBottom: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemPaddingBottom<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'paddingBottom', scale, theme, value: props.paddingBottom })

export const systemPaddingLeft: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemPaddingLeft<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'paddingLeft', scale, theme, value: props.paddingLeft })

export const systemPaddingRight: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemPaddingRight<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'paddingRight', scale, theme, value: props.paddingRight })

export const systemPaddingTop: <Token extends TokenBase = TokenSpace>(
  scale?: ScaleType | ScaleName,
) => System<SystemPaddingTop<Token | SystemUnits | TokenPropertyValue>> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'paddingTop', scale, theme, value: props.paddingTop })

export const systemSpace = (scale?: ScaleType | ScaleName) =>
  systemCompose(
    systemMargin(scale),
    systemMarginBottom(scale),
    systemMarginLeft(scale),
    systemMarginRight(scale),
    systemMarginTop(scale),
    systemPadding(scale),
    systemPaddingBottom(scale),
    systemPaddingLeft(scale),
    systemPaddingRight(scale),
    systemPaddingTop(scale),
  )
