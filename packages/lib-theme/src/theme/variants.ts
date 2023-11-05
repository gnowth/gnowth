import type { ObjectLiteral, UtilNamespaced } from '@gnowth/lib-utils'
import { guardFunction, guardObject, objectDefaults, transformToArray } from '@gnowth/lib-utils'

import type { Theme } from './theme'
import { namespacedMerge } from '../utils/namespace-merge'

type Configs = { variantsNamespaced?: VariantsNamespaced }
type ConfigsVariant<Props extends ObjectLiteral> = WithThemeVariant<Props> & { theme: Theme }
type Variant<Props extends ObjectLiteral> = Partial<Props>
type VariantDynamic<Props extends ObjectLiteral> = (props: Props & { theme: Theme }) => Variant<Props>
type VariantName = string
type VariantNamespace = string
type Variants<Props extends ObjectLiteral = ObjectLiteral> = UtilNamespaced<VariantType<Props>, VariantName>
type VariantsNamespaced = UtilNamespaced<Variants, VariantNamespace>

export type VariantType<Props extends ObjectLiteral = ObjectLiteral> = VariantDynamic<Props> | Variant<Props>
export type WithThemeVariant<Props extends ObjectLiteral> = Props & {
  variant?: Variant<Props> | VariantName
  variantNamespace?: VariantNamespace | VariantNamespace[]
  variants?: Variants<Props>
}

export class VariantManager {
  #variantsNamespaced: VariantsNamespaced = {}

  constructor(configs?: Configs) {
    this.#variantsNamespaced = configs?.variantsNamespaced ?? {}
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
    if (guardObject(configs.variant)) {
      return configs.variant
    }

    const variants = objectDefaults(configs.variants ?? {}, this.#getVariantsByNamespace(variantNamespace))
    const variant = variants[configs.variant]

    if (guardFunction<VariantDynamic<Props>>(variant)) {
      return variant(configs)
    }

    return variant
  }

  #getVariantsByNamespace<Props extends ObjectLiteral>(
    namespace: VariantNamespace[],
  ): Variants<Props> | undefined {
    const maybeNamespace = namespace.find((nspace) => this.#variantsNamespaced[nspace])

    return maybeNamespace ? this.#variantsNamespaced[maybeNamespace] : undefined
  }
}
