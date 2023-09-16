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
    systemInterpolate({ key: 'alignContent', theme, value: props.alignContent })
}

export function systemAlignItems() {
  return (props: SystemAlignItems, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'alignItems', theme, value: props.alignItems })
}

export function systemAlignSelf() {
  return (props: SystemAlignSelf, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'alignSelf', theme, value: props.alignSelf })
}

export function systemFlex() {
  return (props: SystemFlex, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'flex', theme, value: props.flex })
}

export function systemFlexBasis() {
  return (props: SystemFlexBasis, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'flexBasis', theme, value: props.flexBasis })
}

export function systemFlexDirection() {
  return (props: SystemFlexDirection, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'flexDirection', theme, value: props.flexDirection })
}

export function systemFlexGrow() {
  return (props: SystemFlexGrow, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'flexGrow', theme, value: props.flexGrow })
}

export function systemFlexShrink() {
  return (props: SystemFlexShrink, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'flexShrink', theme, value: props.flexShrink })
}

export function systemFlexWrap() {
  return (props: SystemFlexWrap, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'flexWrap', theme, value: props.flexWrap })
}

export function systemJustifyContent() {
  return (props: SystemJustifyContent, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'justifyContent', theme, value: props.justifyContent })
}

export function systemJustifyItems() {
  return (props: SystemJustifyItems, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'justifyItems', theme, value: props.justifyItems })
}

export function systemJustifySelf() {
  return (props: SystemJustifySelf, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'justifySelf', theme, value: props.justifySelf })
}

export function systemOrder() {
  return (props: SystemOrder, theme: Theme): CSSObject =>
    systemInterpolate({ key: 'order', theme, value: props.order })
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
