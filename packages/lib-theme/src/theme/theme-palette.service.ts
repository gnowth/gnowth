import type { UtilNamespaced } from '@gnowth/lib-utils'
import { arrayKeyBy, arrayUniqBy, chain } from '@gnowth/lib-utils'

import type { TokenColorWeight } from '../tokens/tokens.types'

type PaletteColor = {
  darkContrast: boolean
  hex: ColorHex
  name: TokenColorWeight
}
type Palette = {
  base: ColorHex
  colors: PaletteColor[]
  name: PaletteName
}
type PaletteReference = { name: PaletteName; reference: PaletteName }
type PaletteName = string
type Palettes = UtilNamespaced<PaletteType, PaletteName>
type Configs = { palettes?: PaletteType[] }

export type ColorHex = `#${number}`
export type PaletteType = Palette | PaletteReference
export type ConfigsPalette = {
  palette?: PaletteName
  paletteForContrast?: boolean
  paletteWeight?: TokenColorWeight
}

export class ServiceThemePalette {
  #palettes: Palettes = {}

  constructor(configs?: Configs) {
    this.#palettes = arrayKeyBy(configs?.palettes ?? [], (palette) => palette.name)
  }

  configsMerge(...configsToMerge: Configs[]): Configs {
    return {
      palettes: chain(
        (configs: Configs[]) => configs.flatMap((config) => config.palettes ?? []),
        (palettes: PaletteType[]) => arrayUniqBy(palettes, (palette) => palette.name),
      )(configsToMerge),
    }
  }

  // TODO add opacity to palette?
  getColor(configs: ConfigsPalette): ColorHex | null {
    if (!configs.palette) {
      return null
    }

    const palette = this.#getPalette(configs.palette)
    const paletteColor = this.#getPaletteColor(palette, configs.paletteWeight)

    if (!paletteColor) {
      return null
    }

    if (!configs.paletteForContrast) {
      return paletteColor.hex
    }

    const paletteText = this.#getPalette(paletteColor.darkContrast ? 'textPrimary' : 'textInverse')
    const paletteColorText = this.#getPaletteColor(paletteText, '500')
    return paletteColorText?.hex ?? null
  }

  #getPaletteColor(palette?: Palette, weight: TokenColorWeight = '500'): PaletteColor | undefined {
    return palette?.colors.find((color) => color.name === weight)
  }

  #getPalette(palette?: PaletteName): Palette | undefined {
    if (!palette) {
      return undefined
    }

    const maybePalette = this.#palettes[palette]

    if (!maybePalette) {
      return undefined
    }

    if (this.#guardPaletteReference(maybePalette)) {
      return this.#getPalette(maybePalette.reference)
    }

    return maybePalette
  }

  #guardPaletteReference(paletteType: PaletteType): paletteType is PaletteReference {
    return 'reference' in paletteType && !!paletteType.reference
  }
}
