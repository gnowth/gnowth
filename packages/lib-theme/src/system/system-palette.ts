import type { TokenColorWeight } from '../tokens/tokens'
import type { System } from './system.types'

import { systemBuild } from './system'

type SystemPalette = {
  palette?: string
  paletteForContrast?: boolean
  paletteWeight?: TokenColorWeight
}

export const systemColor = systemBuild<{ color?: string }>({ key: 'color' })

export const systemColorFromPalette: () => System<SystemPalette> = () => (props, theme) => {
  const color = theme.getPaletteColor(props)

  return color ? { color } : {}
}

export const systemBackgroundColorFromPalette: () => System<SystemPalette> = () => (props, theme) => {
  const backgroundColor = theme.getPaletteColor(props)

  return backgroundColor ? { backgroundColor } : {}
}
