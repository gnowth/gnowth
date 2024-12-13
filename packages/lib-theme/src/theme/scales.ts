import { objectDefaults, UtilNamespaced } from '@gnowth/lib-utils'
import * as R from 'remeda'

import { TokenBase, TokenBreakpoint } from '../tokens/tokens'

export type ConfigsScale<Token extends TokenBase = TokenBase> = {
  scale?: ScaleName | ScaleType<Token>
  scaleBreakpoint?: TokenBreakpoint
  scales?: Scales<Token>
  scaleToken?: Token
}
export type ScaleItem = string // TODO: should it allow array?
export type ScaleName = string
export type ScaleType<Token extends TokenBase = TokenBase> =
  | ScaleDynamic<Token>
  | ScaleResponsive<Token>
  | ScaleStatic<Token>
type Configs = { scales?: Scales }
type ConfigsScaleDynamic<Token> = {
  scaleBreakpoint?: TokenBreakpoint
  scaleToken?: Token
}
// TODO: review responsiveScale. currently not supported by system
type Responsive<Type> = Partial<Record<TokenBreakpoint, Type>> & { responsive: boolean }

type ScaleDynamic<Token extends TokenBase> = (configs: ConfigsScaleDynamic<Token>) => ScaleItem | undefined
type ScaleResponsive<Token extends TokenBase> = Responsive<ScaleStatic<Token>>
type Scales<Token extends TokenBase = TokenBase> = UtilNamespaced<ScaleType<Token>, ScaleName>
type ScaleStatic<Token extends TokenBase> = Record<Token, ScaleItem>

export class ScaleManager {
  #scales: Scales

  constructor(configs?: Configs) {
    this.#scales = configs?.scales ?? {}
  }

  configsMerge(...configs: Configs[]): Configs {
    return { scales: Object.assign({}, ...configs.map((config) => config.scales)) }
  }

  getScaleBreakpoint(configs: ConfigsScale): TokenBreakpoint[] {
    const scales = objectDefaults<Scales>(configs.scales ?? {}, this.#scales)
    const scale = R.isString(configs.scale) ? scales[configs.scale] : configs.scale
    return scale && this.#guardScaleResponsive(scale)
      ? (['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).filter(
          (breakpoint) => !!scale[breakpoint],
        )
      : []
  }

  getScaleItem(configs: ConfigsScale): ScaleItem | undefined {
    const scales = objectDefaults<Scales>(configs.scales ?? {}, this.#scales)
    const scale = R.isString(configs.scale) ? scales[configs.scale] : configs.scale
    if (!scale || !configs.scaleToken) {
      return undefined
    }
    if (R.isFunction(scale)) {
      return scale(configs)
    }
    // TODO: add default token in ScaleDynamic { token: Token, [token: Token]: ScaleItem }
    if (this.#guardScaleResponsive(scale)) {
      return scale[configs.scaleBreakpoint ?? 'none']?.[configs.scaleToken]
    }
    return scale[configs.scaleToken]
  }

  #guardScaleResponsive<Token extends string>(scale: ScaleType<Token>): scale is ScaleResponsive<Token> {
    return 'responsive' in scale && scale.responsive === true
  }
}
