import { Theme } from '@gnowth/lib-theme'

import paletteGoogle from './palette-google.json'
import paletteStandard from './palette-standard.json'

export default {
  ...Theme.assemblePalettesFromJSON(...paletteGoogle, ...paletteStandard),
  primary: 'indigo',
  secondary: 'cyan',
  danger: 'red',
}
