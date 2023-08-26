import type { CSSObject } from '@emotion/css'
import type {
  SystemMargin,
  SystemMarginBottom,
  SystemMarginLeft,
  SystemMarginRight,
  SystemMarginTop,
  SystemPadding,
  SystemPaddingBottom,
  SystemPaddingLeft,
  SystemPaddingRight,
  SystemPaddingTop,
  SystemSpace,
  Theme,
} from '@gnowth/lib-types'

import type { ThemeScale } from '../types'
import { systemCompose, systemInterpolate } from './system'

export function systemMargin(scale: ThemeScale | string = 'space') {
  return (props: SystemMargin, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'margin', value: props.margin })
}

export function systemMarginBottom(scale: ThemeScale | string = 'space') {
  return (props: SystemMarginBottom, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'marginBottom', value: props.marginBottom })
}

export function systemMarginLeft(scale: ThemeScale | string = 'space') {
  return (props: SystemMarginLeft, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'marginLeft', value: props.marginLeft })
}

export function systemMarginRight(scale: ThemeScale | string = 'space') {
  return (props: SystemMarginRight, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'marginRight', value: props.marginRight })
}

export function systemMarginTop(scale: ThemeScale | string = 'space') {
  return (props: SystemMarginTop, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'marginTop', value: props.marginTop })
}

export function systemPadding(scale: ThemeScale | string = 'space') {
  return (props: SystemPadding, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'padding', value: props.padding })
}

export function systemPaddingBottom(scale: ThemeScale | string = 'space') {
  return (props: SystemPaddingBottom, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'paddingBottom', value: props.paddingBottom })
}

export function systemPaddingLeft(scale: ThemeScale | string = 'space') {
  return (props: SystemPaddingLeft, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'paddingLeft', value: props.paddingLeft })
}

export function systemPaddingRight(scale: ThemeScale | string = 'space') {
  return (props: SystemPaddingRight, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'paddingRight', value: props.paddingRight })
}

export function systemPaddingTop(scale: ThemeScale | string = 'space') {
  return (props: SystemPaddingTop, theme: Theme): CSSObject =>
    systemInterpolate({ scale, theme, key: 'paddingTop', value: props.paddingTop })
}

type ReturnSpace = (props: SystemSpace, theme: Theme) => CSSObject

export function systemSpace(scale: ThemeScale | string = 'space'): ReturnSpace {
  return systemCompose<SystemSpace>(
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
}
