import type { Interpolate } from '../util'

export interface SystemMargin {
  margin?: Interpolate<number | string>
}

export interface SystemMarginBottom {
  marginBottom?: Interpolate<number | string>
}

export interface SystemMarginLeft {
  marginLeft?: Interpolate<number | string>
}

export interface SystemMarginRight {
  marginRight?: Interpolate<number | string>
}

export interface SystemMarginTop {
  marginTop?: Interpolate<number | string>
}

export interface SystemPadding {
  padding?: Interpolate<number | string>
}

export interface SystemPaddingBottom {
  paddingBottom?: Interpolate<number | string>
}

export interface SystemPaddingLeft {
  paddingLeft?: Interpolate<number | string>
}

export interface SystemPaddingRight {
  paddingRight?: Interpolate<number | string>
}

export interface SystemPaddingTop {
  paddingTop?: Interpolate<number | string>
}

export interface SystemSpace
  extends SystemMargin,
    SystemMarginBottom,
    SystemMarginLeft,
    SystemMarginRight,
    SystemMarginTop,
    SystemPadding,
    SystemPaddingBottom,
    SystemPaddingLeft,
    SystemPaddingRight,
    SystemPaddingTop {}
