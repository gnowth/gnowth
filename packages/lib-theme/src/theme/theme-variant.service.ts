import type { ObjectLiteral, UtilNamespaced } from '@gnowth/lib-utils'
import { guardFunction, objectDefaults, transformToArray } from '@gnowth/lib-utils'

import type { Theme } from './theme.next'
import { namespacedMerge } from '../utils/namespace-merge'
import { objectDefaultsDeepByKeys } from './theme.utils'

type VariantDynamic<Props extends ObjectLiteral> = (props: Props & { theme: Theme }) => Variant<Props>
type VariantName = string
type VariantNamespace = string
type Variants<Props extends ObjectLiteral = ObjectLiteral> = UtilNamespaced<VariantType<Props>, VariantName>
type VariantsNamespaced = UtilNamespaced<Variants, VariantNamespace>
type Configs = { theme: Theme; variantsNamespaced?: VariantsNamespaced }

export type Variant<Props extends ObjectLiteral> = Partial<Props>
export type VariantType<Props extends ObjectLiteral = ObjectLiteral> = VariantDynamic<Props> | Variant<Props>
export type ConfigsVariant<Props extends ObjectLiteral> = {
  theme?: Theme
  variant?: string // TODO: check if it should allow as an object
  variantNamespace?: VariantNamespace | VariantNamespace[]
  variants?: Variants<Props>
} & Props

export class ServiceThemeVariant {
  #theme: Theme
  #variantsNamespaced: VariantsNamespaced = {}

  constructor(configs: Configs) {
    this.#theme = configs.theme
    this.#variantsNamespaced = configs.variantsNamespaced ?? {}
  }

  configsMerge(...configs: Omit<Configs, 'theme'>[]): Omit<Configs, 'theme'> {
    return { variantsNamespaced: namespacedMerge(configs.map((config) => config.variantsNamespaced)) }
  }

  getVariant<Props extends ObjectLiteral>(
    configOverrides: ConfigsVariant<Props>[],
  ): Variant<Props> | undefined {
    const configs = this.#mergeConfigs(configOverrides)
    const variantNamespace = transformToArray(configs.variantNamespace)
    if (!variantNamespace.length || !configs.variant) {
      return undefined
    }
    const configsWithTheme = {
      theme: this.#theme,
      ...configs,
    }

    const variants = objectDefaults(configs.variants ?? {}, this.#getVariantsByNamespace(variantNamespace))
    const variant = variants[configs.variant]

    if (guardFunction<VariantDynamic<Props>>(variant)) {
      return variant(configsWithTheme)
    }

    return variant
  }

  getVariantByDefinitions<Props extends ObjectLiteral>(
    definitions: (props: Props) => Variant<Props>[],
    props: Props,
    propsDefault?: Partial<Props>,
    mergeKeys: Array<keyof Props> = [],
  ): Props {
    const propsWithDefault = objectDefaults(props, propsDefault)

    const variants = definitions(propsWithDefault).map(
      (definition) => this.getVariant([definition, propsWithDefault]) ?? undefined,
    )

    return objectDefaultsDeepByKeys(mergeKeys, props, ...variants, propsDefault)
  }

  #getVariantsByNamespace<Props extends ObjectLiteral>(namespace: VariantNamespace[]): Variants<Props> {
    const maybeNamespace = namespace.find((nspace) => this.#variantsNamespaced[nspace])

    return maybeNamespace ? this.#variantsNamespaced[maybeNamespace] ?? {} : {}
  }

  #mergeConfigs<Props extends ObjectLiteral>(configs: ConfigsVariant<Props>[]): ConfigsVariant<Props> {
    return {
      ...Object.assign({}, ...configs),
      variantNamespace: configs.flatMap((config) => transformToArray(config.variantNamespace)),
      variants: Object.assign({}, ...configs.map((config) => config.variants)),
    }
  }
}
