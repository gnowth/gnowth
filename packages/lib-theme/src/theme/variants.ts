import type { ObjectLiteral, UtilNamespaced } from '@gnowth/lib-utils'

import { objectDefaults, transformToArray } from '@gnowth/lib-utils'
import * as R from 'remeda'

import type { Theme } from './theme'

import { namespacedMerge } from '../utils/namespace-merge'

type Configs = { variantsNamespaced?: VariantsNamespaced }
type ConfigsVariant<Props extends ObjectLiteral> = { theme: Theme } & WithThemeVariant<Props>
type Variant<Props extends ObjectLiteral> = Partial<Props>
type VariantDynamic<Props extends ObjectLiteral> = (props: { theme: Theme } & Props) => Variant<Props>
type VariantName = string
type VariantNamespace = string
export type ThemeVariants<Props extends ObjectLiteral = ObjectLiteral> = UtilNamespaced<
  VariantType<Props>,
  VariantName
>
type VariantsNamespaced = UtilNamespaced<ThemeVariants, VariantNamespace>

export type VariantType<Props extends ObjectLiteral = ObjectLiteral> = Variant<Props> | VariantDynamic<Props>
export type WithThemeVariant<Props extends ObjectLiteral> = {
  variant?: Variant<Props> | VariantName
  variantNamespace?: VariantNamespace | VariantNamespace[]
  variants?: ThemeVariants<Props>
} & Props

export class VariantManager {
  #variantsNamespaced: VariantsNamespaced = {}

  constructor(configs?: Configs) {
    this.#variantsNamespaced = configs?.variantsNamespaced ?? {}
  }

  #getVariantsByNamespace<Props extends ObjectLiteral>(
    namespace: VariantNamespace[],
  ): ThemeVariants<Props> | undefined {
    const maybeNamespace = namespace.find((nspace) => this.#variantsNamespaced[nspace])

    return maybeNamespace ? this.#variantsNamespaced[maybeNamespace] : undefined
  }

  configsMerge(...configs: Configs[]): Configs {
    return { variantsNamespaced: namespacedMerge(configs.map((config) => config.variantsNamespaced)) }
  }

  // TODO: think how will the variant override the nested component
  get<Props extends ObjectLiteral>(configs: ConfigsVariant<Props>): Variant<Props> | undefined {
    const variantNamespace = transformToArray(configs.variantNamespace)
    if (!variantNamespace.length || !configs.variant) {
      return undefined
    }

    // TODO check logic around nested variant. we want to move away from variant as an object
    if (R.isObjectType(configs.variant)) {
      return configs.variant
    }

    const variants = objectDefaults(configs.variants ?? {}, this.#getVariantsByNamespace(variantNamespace))
    const variant = variants[configs.variant]

    if (R.isFunction(variant)) {
      return variant(configs)
    }

    return variant
  }
}
