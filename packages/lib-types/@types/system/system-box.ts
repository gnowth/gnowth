import type { Interpolate } from '../util'

export interface SystemBorder {
  border?: Interpolate<string>
}

export interface SystemBorderBottom {
  borderBottom?: Interpolate<string>
}

export interface SystemBorderColor {
  borderColor?: Interpolate<string>
}

export interface SystemBorderLeft {
  borderLeft?: Interpolate<string>
}

export interface SystemBorderRadius {
  borderRadius?: Interpolate<string>
}

export interface SystemBorderRight {
  borderRight?: Interpolate<string>
}

export interface SystemBorderTop {
  borderTop?: Interpolate<string>
}

export interface SystemBoxShadow {
  boxShadow?: Interpolate<string>
}

export interface SystemOutline {
  outline?: Interpolate<string>
}

export interface SystemBox
  extends SystemBorder,
    SystemBorderBottom,
    SystemBorderColor,
    SystemBorderLeft,
    SystemBorderRadius,
    SystemBorderRight,
    SystemBorderTop,
    SystemBoxShadow,
    SystemOutline {}
