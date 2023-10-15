import type { SystemInterpolate, System } from './system.types'
import { systemCompose, systemInterpolate } from './system'

type SystemAlignContent = { alignContent?: SystemInterpolate<string> }
type SystemAlignItems = { alignItems?: SystemInterpolate<string> }
type SystemAlignSelf = { alignSelf?: SystemInterpolate<string> }
type SystemFlex = { flex?: SystemInterpolate<string> }
type SystemFlexBasis = { flexBasis?: SystemInterpolate<string> }
type SystemFlexDirection = { flexDirection?: SystemInterpolate<string> }
type SystemFlexGrow = { flexGrow?: SystemInterpolate<string> }
type SystemFlexShrink = { flexShrink?: SystemInterpolate<string> }
type SystemFlexWrap = { flexWrap?: SystemInterpolate<string> }
type SystemJustifyContent = { justifyContent?: SystemInterpolate<string> }
type SystemJustifyItems = { justifyItems?: SystemInterpolate<string> }
type SystemJustifySelf = { justifySelf?: SystemInterpolate<string> }
type SystemOrder = { order?: SystemInterpolate<string> }

export const systemAlignContent: () => System<SystemAlignContent> = () => (props, theme) =>
  systemInterpolate({ key: 'alignContent', theme, value: props.alignContent })

export const systemAlignItems: () => System<SystemAlignItems> = () => (props, theme) =>
  systemInterpolate({ key: 'alignItems', theme, value: props.alignItems })

export const systemAlignSelf: () => System<SystemAlignSelf> = () => (props, theme) =>
  systemInterpolate({ key: 'alignSelf', theme, value: props.alignSelf })

export const systemFlex: () => System<SystemFlex> = () => (props, theme) =>
  systemInterpolate({ key: 'flex', theme, value: props.flex })

export const systemFlexBasis: () => System<SystemFlexBasis> = () => (props, theme) =>
  systemInterpolate({ key: 'flexBasis', theme, value: props.flexBasis })

export const systemFlexDirection: () => System<SystemFlexDirection> = () => (props, theme) =>
  systemInterpolate({ key: 'flexDirection', theme, value: props.flexDirection })

export const systemFlexGrow: () => System<SystemFlexGrow> = () => (props, theme) =>
  systemInterpolate({ key: 'flexGrow', theme, value: props.flexGrow })

export const systemFlexShrink: () => System<SystemFlexShrink> = () => (props, theme) =>
  systemInterpolate({ key: 'flexShrink', theme, value: props.flexShrink })

export const systemFlexWrap: () => System<SystemFlexWrap> = () => (props, theme) =>
  systemInterpolate({ key: 'flexWrap', theme, value: props.flexWrap })

export const systemJustifyContent: () => System<SystemJustifyContent> = () => (props, theme) =>
  systemInterpolate({ key: 'justifyContent', theme, value: props.justifyContent })

export const systemJustifyItems: () => System<SystemJustifyItems> = () => (props, theme) =>
  systemInterpolate({ key: 'justifyItems', theme, value: props.justifyItems })

export const systemJustifySelf: () => System<SystemJustifySelf> = () => (props, theme) =>
  systemInterpolate({ key: 'justifySelf', theme, value: props.justifySelf })

export const systemOrder: () => System<SystemOrder> = () => (props, theme) =>
  systemInterpolate({ key: 'order', theme, value: props.order })

export const systemFlexbox = () =>
  systemCompose(
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
