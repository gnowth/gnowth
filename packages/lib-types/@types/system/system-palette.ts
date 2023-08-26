import type { Interpolate } from '../util'

export interface SystemColor {
  color?: Interpolate<string>
}

export interface SystemPalette {
  palette?: string
  paletteForContrast?: boolean
  paletteWeight?: string | number
}
