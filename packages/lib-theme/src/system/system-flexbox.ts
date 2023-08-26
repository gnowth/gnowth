import type { CSSObject } from '@emotion/css'
import type {
  SystemAlignContent,
  SystemAlignItems,
  SystemAlignSelf,
  SystemFlex,
  SystemFlexBasis,
  SystemFlexbox,
  SystemFlexDirection,
  SystemFlexGrow,
  SystemFlexShrink,
  SystemFlexWrap,
  SystemJustifyContent,
  SystemJustifyItems,
  SystemJustifySelf,
  SystemOrder,
  Theme,
} from '@gnowth/lib-types'

import { systemCompose, systemInterpolate } from './system'

export function systemAlignContent() {
  return (props: SystemAlignContent, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'alignContent', value: props.alignContent })
}

export function systemAlignItems() {
  return (props: SystemAlignItems, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'alignItems', value: props.alignItems })
}

export function systemAlignSelf() {
  return (props: SystemAlignSelf, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'alignSelf', value: props.alignSelf })
}

export function systemFlex() {
  return (props: SystemFlex, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'flex', value: props.flex })
}

export function systemFlexBasis() {
  return (props: SystemFlexBasis, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'flexBasis', value: props.flexBasis })
}

export function systemFlexDirection() {
  return (props: SystemFlexDirection, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'flexDirection', value: props.flexDirection })
}

export function systemFlexGrow() {
  return (props: SystemFlexGrow, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'flexGrow', value: props.flexGrow })
}

export function systemFlexShrink() {
  return (props: SystemFlexShrink, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'flexShrink', value: props.flexShrink })
}

export function systemFlexWrap() {
  return (props: SystemFlexWrap, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'flexWrap', value: props.flexWrap })
}

export function systemJustifyContent() {
  return (props: SystemJustifyContent, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'justifyContent', value: props.justifyContent })
}

export function systemJustifyItems() {
  return (props: SystemJustifyItems, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'justifyItems', value: props.justifyItems })
}

export function systemJustifySelf() {
  return (props: SystemJustifySelf, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'justifySelf', value: props.justifySelf })
}

export function systemOrder() {
  return (props: SystemOrder, theme: Theme): CSSObject =>
    systemInterpolate({ theme, key: 'order', value: props.order })
}

export function systemFlexbox(): (props: SystemFlexbox, theme: Theme) => CSSObject {
  return systemCompose<SystemFlexbox>(
    systemAlignContent(),
    systemAlignItems(),
    systemAlignSelf(),
    systemFlex(),
    systemFlexBasis(),
    systemFlexDirection(),
    systemFlexGrow(),
    systemFlexShrink(),
    systemFlexWrap(),
    systemJustifyContent(),
    systemJustifyItems(),
    systemJustifySelf(),
    systemOrder(),
  )
}
