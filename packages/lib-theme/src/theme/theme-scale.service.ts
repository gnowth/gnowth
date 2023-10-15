import type { UtilNamespaced } from '@gnowth/lib-utils'
import { guardFunction, guardString, objectDefaults } from '@gnowth/lib-utils'

import type { TokenBreakpoint } from '../tokens/tokens.types'
import type { Responsive } from './theme.types'

type ScaleDynamic<Token extends string> = (configs: ConfigsScaleDynamic<Token>) => ScaleItem | undefined
type ScaleResponsive<Token extends string> = Responsive<ScaleStatic<Token>>
type ScaleStatic<Token extends string> = Record<Token, ScaleItem>
type Scales<Token extends string = string> = UtilNamespaced<ScaleType<Token>, ScaleName>
type Configs = { scales?: Scales }
type ConfigsScaleDynamic<Token> = {
  scaleToken?: Token
  scaleBreakpoint?: TokenBreakpoint
}

export type ScaleItem = string // TODO: should it allow array?
export type ScaleName = string
export type ScaleType<Token extends string = string> =
  | ScaleDynamic<Token>
  | ScaleStatic<Token>
  | ScaleResponsive<Token>
export type ConfigsScale<Token extends string = string> = {
  scale?: ScaleType<Token> | ScaleName
  scales?: Scales<Token>
  scaleToken?: Token
  scaleBreakpoint?: TokenBreakpoint
}

export class ServiceThemeScale {
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
      return scale[configs.scaleBreakpoint ?? 'none'][configs.scaleToken]
    }

    return scale[configs.scaleToken]
  }

  #guardScaleResponsive<Token extends string>(scale: ScaleType<Token>): scale is ScaleResponsive<Token> {
    return 'responsive' in scale && scale.responsive === true
  }
}
