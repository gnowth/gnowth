import type { Interpolate } from '../util'

export interface SystemAlignContent {
  alignContent?: Interpolate<string>
}

export interface SystemAlignItems {
  alignItems?: Interpolate<string>
}

export interface SystemAlignSelf {
  alignSelf?: Interpolate<string>
}

export interface SystemFlex {
  flex?: Interpolate<string>
}

export interface SystemFlexBasis {
  flexBasis?: Interpolate<string>
}

export interface SystemFlexDirection {
  flexDirection?: Interpolate<string>
}

export interface SystemFlexGrow {
  flexGrow?: Interpolate<string>
}

export interface SystemFlexShrink {
  flexShrink?: Interpolate<string>
}

export interface SystemFlexWrap {
  flexWrap?: Interpolate<string>
}

export interface SystemJustifyContent {
  justifyContent?: Interpolate<string>
}

export interface SystemJustifyItems {
  justifyItems?: Interpolate<string>
}

export interface SystemJustifySelf {
  justifySelf?: Interpolate<string>
}

export interface SystemOrder {
  order?: Interpolate<string>
}

export interface SystemFlexbox
  extends SystemAlignContent,
    SystemAlignItems,
    SystemAlignSelf,
    SystemFlex,
    SystemFlexBasis,
    SystemFlexDirection,
    SystemFlexGrow,
    SystemFlexShrink,
    SystemFlexWrap,
    SystemJustifyContent,
    SystemJustifyItems,
    SystemJustifySelf,
    SystemOrder {}
