import { TokenColorWeight } from '../tokens/tokens'
import { systemMake } from './system'
import { System } from './system.types'

type SystemPalette = {
  palette?: string
  paletteForContrast?: boolean
  paletteWeight?: TokenColorWeight
}

export const systemColor = systemMake<{ color: string }>({ key: 'color' })
export const systemColorFromPalette: () => System<SystemPalette> = () => (props, theme) => {
  const color = theme.getPaletteColor(props)
  return color ? { color } : {}
}

export const systemBackgroundColorFromPalette: () => System<SystemPalette> = () => (props, theme) => {
  const backgroundColor = theme.getPaletteColor(props)
  return backgroundColor ? { backgroundColor } : {}
}
