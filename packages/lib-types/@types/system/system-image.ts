import type { Interpolate } from '../util'

export interface SystemBackground {
  background?: Interpolate<string>
}

export interface SystemBackgroundColor {
  backgroundColor?: Interpolate<string>
}

export interface SystemBackgroundImage {
  backgroundImage?: Interpolate<string>
}

export interface SystemBackgroundPosition {
  backgroundPosition?: Interpolate<string>
}

export interface SystemBackgroundRepeat {
  backgroundRepeat?: Interpolate<string>
}

export interface SystemBackgroundSize {
  backgroundSize?: Interpolate<string>
}

export interface SystemImage
  extends SystemBackground,
    SystemBackgroundColor,
    SystemBackgroundImage,
    SystemBackgroundPosition,
    SystemBackgroundRepeat,
    SystemBackgroundSize {}
