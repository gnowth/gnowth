import type { Interpolate, System, ThemeScale } from '../types'
import { systemCompose, systemInterpolate } from './system'

type SystemMargin = { margin?: Interpolate<number | string> }
type SystemMarginBottom = { marginBottom?: Interpolate<number | string> }
type SystemMarginLeft = { marginLeft?: Interpolate<number | string> }
type SystemMarginRight = { marginRight?: Interpolate<number | string> }
type SystemMarginTop = { marginTop?: Interpolate<number | string> }
type SystemPadding = { padding?: Interpolate<number | string> }
type SystemPaddingBottom = { paddingBottom?: Interpolate<number | string> }
type SystemPaddingLeft = { paddingLeft?: Interpolate<number | string> }
type SystemPaddingRight = { paddingRight?: Interpolate<number | string> }
type SystemPaddingTop = { paddingTop?: Interpolate<number | string> }

export const systemMargin: (scale?: ThemeScale | string) => System<SystemMargin> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'margin', scale, theme, value: props.margin })

export const systemMarginBottom: (scale?: ThemeScale | string) => System<SystemMarginBottom> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'marginBottom', scale, theme, value: props.marginBottom })

export const systemMarginLeft: (scale?: ThemeScale | string) => System<SystemMarginLeft> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'marginLeft', scale, theme, value: props.marginLeft })

export const systemMarginRight: (scale?: ThemeScale | string) => System<SystemMarginRight> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'marginRight', scale, theme, value: props.marginRight })

export const systemMarginTop: (scale?: ThemeScale | string) => System<SystemMarginTop> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'marginTop', scale, theme, value: props.marginTop })

export const systemPadding: (scale?: ThemeScale | string) => System<SystemPadding> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'padding', scale, theme, value: props.padding })

export const systemPaddingBottom: (scale?: ThemeScale | string) => System<SystemPaddingBottom> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'paddingBottom', scale, theme, value: props.paddingBottom })

export const systemPaddingLeft: (scale?: ThemeScale | string) => System<SystemPaddingLeft> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'paddingLeft', scale, theme, value: props.paddingLeft })

export const systemPaddingRight: (scale?: ThemeScale | string) => System<SystemPaddingRight> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'paddingRight', scale, theme, value: props.paddingRight })

export const systemPaddingTop: (scale?: ThemeScale | string) => System<SystemPaddingTop> =
  (scale = 'space') =>
  (props, theme) =>
    systemInterpolate({ key: 'paddingTop', scale, theme, value: props.paddingTop })

export const systemSpace = (scale?: ThemeScale | string) =>
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
