import type { UtilNamespaced } from '@gnowth/lib-utils'
import { guardFunction, guardString, objectDefaults } from '@gnowth/lib-utils'

import type { TokenBase, TokenBreakpoint } from '../tokens/tokens'

// TODO: review responsiveScale. currently not supported by system
type Responsive<Type> = { responsive: true } & { [Key in TokenBreakpoint]?: Type }
type ScaleDynamic<Token extends TokenBase> = (configs: ConfigsScaleDynamic<Token>) => ScaleItem | undefined
type ScaleResponsive<Token extends TokenBase> = Responsive<ScaleStatic<Token>>
type ScaleStatic<Token extends TokenBase> = Record<Token, ScaleItem>
type Scales<Token extends TokenBase = TokenBase> = UtilNamespaced<ScaleType<Token>, ScaleName>
type Configs = { scales?: Scales }
type ConfigsScaleDynamic<Token> = {
  scaleToken?: Token
  scaleBreakpoint?: TokenBreakpoint
}

export type ScaleItem = string // TODO: should it allow array?
export type ScaleName = string
export type ScaleType<Token extends TokenBase = TokenBase> =
  | ScaleDynamic<Token>
  | ScaleStatic<Token>
  | ScaleResponsive<Token>
export type ConfigsScale<Token extends TokenBase = TokenBase> = {
  scale?: ScaleType<Token> | ScaleName
  scales?: Scales<Token>
  scaleToken?: Token
  scaleBreakpoint?: TokenBreakpoint
}

export class ScaleManager {
  #scales: Scales

  constructor(configs?: Configs) {
    this.#scales = configs?.scales ?? {}
  }

  configsMerge(...configs: Configs[]): Configs {
    return Object.assign({}, ...configs)
  }

  // TODO: scaleBreakpoint should follow mobile first, if there is no value at this breakpoint, it should check lower breakpoint
  getScaleItem(configs: ConfigsScale): ScaleItem | undefined {
    const scales = objectDefaults<Scales>(configs.scales ?? {}, this.#scales)

    const scale = guardString(configs.scale) ? scales[configs.scale] : configs.scale

    if (!scale || !configs.scaleToken) {
      return undefined
    }

    if (guardFunction<ScaleDynamic<string>>(scale)) {
      return scale(configs)
    }

    // TODO: add default token in ScaleDynamic { token: Token, [token: Token]: ScaleItem }
    if (!configs.scaleToken) {
      return undefined
    }

    if (this.#guardScaleResponsive(scale)) {
      return scale[configs.scaleBreakpoint ?? 'none']?.[configs.scaleToken]
    }

    return scale[configs.scaleToken]
  }

  #guardScaleResponsive<Token extends string>(scale: ScaleType<Token>): scale is ScaleResponsive<Token> {
    return 'responsive' in scale && scale.responsive === true
  }
}
