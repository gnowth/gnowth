import { PaletteType } from '@gnowth/lib-theme'

import paletteGoogle from './palette-google.json'
import paletteStandard from './palette-standard.json'

export const palettes = [
  ...(paletteGoogle as PaletteType[]),
  ...(paletteStandard as PaletteType[]),
  { name: 'danger', reference: 'red' },
  { name: 'primary', reference: 'indigo' },
  { name: 'secondary', reference: 'cyan' },
]
