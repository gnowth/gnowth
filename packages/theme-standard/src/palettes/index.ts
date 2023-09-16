import { Theme } from '@gnowth/lib-theme'

import paletteGoogle from './palette-google.json'
import paletteStandard from './palette-standard.json'

export const palettes = {
  ...Theme.assemblePalettesFromJSON(...paletteGoogle, ...paletteStandard),
  danger: 'red',
  primary: 'indigo',
  secondary: 'cyan',
}
