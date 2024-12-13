import { UtilNamespaced } from '@gnowth/lib-utils'
import * as R from 'remeda'

import { TokenColorWeight } from '../tokens/tokens'

export type ColorHex = `#${string}`
export type ConfigsPalette = {
  palette?: PaletteName
  paletteForContrast?: boolean
  paletteWeight?: TokenColorWeight
}
export type PaletteType = Palette | PaletteReference
type Configs = { palettes?: PaletteType[] }
type Palette = {
  base: ColorHex
  colors: PaletteColor[]
  name: PaletteName
}
type PaletteColor = {
  darkContrast: boolean
  hex: ColorHex
  name: TokenColorWeight
}

type PaletteName = string
type PaletteReference = { name: PaletteName; reference: PaletteName }
type Palettes = UtilNamespaced<PaletteType, PaletteName>

export class PaletteManager {
  #palettes: Palettes = {}

  constructor(configs?: Configs) {
    this.#palettes = R.indexBy(configs?.palettes ?? [], (palette) => palette.name)
  }

  configsMerge(...configsToMerge: Configs[]): Configs {
    return {
      palettes: R.pipe(
        configsToMerge,
        R.flatMap((configs) => configs.palettes ?? []),
        R.reverse(),
        R.uniqueBy((palette) => palette.name),
        R.reverse(),
      ),
    }
  }

  // TODO add opacity to palette?
  getColor(configs: ConfigsPalette): ColorHex | undefined {
    if (!configs.palette) {
      return undefined
    }
    const palette = this.#get(configs.palette)
    const paletteColor = this.#getPaletteColor(palette, configs.paletteWeight)
    if (!paletteColor) {
      return undefined
    }
    if (!configs.paletteForContrast) {
      return paletteColor.hex
    }
    const paletteText = this.#get(paletteColor.darkContrast ? 'textPrimary' : 'textInverse')
    const paletteColorText = this.#getPaletteColor(paletteText, '500')
    return paletteColorText?.hex
  }

  #get(palette: PaletteName): Palette | undefined {
    const maybePalette = this.#palettes[palette]
    if (!maybePalette) {
      return undefined
    }
    if (this.#guardPaletteReference(maybePalette)) {
      return this.#get(maybePalette.reference)
    }
    return maybePalette
  }

  #getPaletteColor(palette?: Palette, weight: TokenColorWeight = '500'): PaletteColor | undefined {
    return palette?.colors.find((color) => color.name === weight)
  }

  #guardPaletteReference(paletteType: PaletteType): paletteType is PaletteReference {
    return 'reference' in paletteType && !!paletteType.reference
  }
}
