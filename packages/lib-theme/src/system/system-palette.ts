import type { TokenColorWeight } from '../tokens/tokens'
import type { System, SystemInterpolate } from './system.types'

import { systemInterpolate } from './system'

type SystemColor = { color?: SystemInterpolate<string> }
type SystemPalette = {
  palette?: string
  paletteForContrast?: boolean
  paletteWeight?: TokenColorWeight
}

export const systemColor: () => System<SystemColor> = () => (props, theme) =>
  systemInterpolate({ key: 'color', theme, value: props.color })

export const systemColorFromPalette: () => System<SystemPalette> = () => (props, theme) => {
  const color = theme.getPaletteColor(props)

  return color ? { color } : {}
}

export const systemBackgroundColorFromPalette: () => System<SystemPalette> = () => (props, theme) => {
  const backgroundColor = theme.getPaletteColor(props)

  return backgroundColor ? { backgroundColor } : {}
}
