import type { ObjectLiteral, UtilNamespaced } from '@gnowth/lib-utils'
import type { ComponentType } from 'react'

import { objectDefaults } from '@gnowth/lib-utils'

import type { TokenBreakpoint } from '../tokens/tokens'
import type { ConfigsComponent } from './components'
import type { Media, MediaName } from './media'
import type { ColorHex, ConfigsPalette, PaletteType } from './palettes'
import type { ConfigsScale, ScaleItem, ScaleType } from './scales'
import type { Variable } from './variables'
import type { VariantType, WithThemeVariant } from './variants'

import { ComponentManager } from './components'
import { MediaManager } from './media'
import { PaletteManager } from './palettes'
import { ScaleManager } from './scales'
import { objectDefaultsDeepByKeys } from './theme.utils'
import { VariableManager } from './variables'
import { VariantManager } from './variants'

type Configs = {
  componentsNamespaced?: UtilNamespaced<UtilNamespaced<ComponentType>>
  // TODO: move global into stylesheet
  global?: string
  medias?: UtilNamespaced<Media>
  palettes?: PaletteType[]
  scales?: UtilNamespaced<ScaleType>
  variables?: UtilNamespaced<Variable>
  variantsNamespaced?: UtilNamespaced<UtilNamespaced<VariantType>>
  // fonts?: unknown
  // stylesheets?: unknown
}

export class Theme {
  #componentManager: ComponentManager
  #configs?: Configs
  #mediaManager: MediaManager
  #paletteManager: PaletteManager
  #scaleManager: ScaleManager
  #variableManager: VariableManager
  #variantManager: VariantManager
  global?: string

  constructor(configs?: Configs) {
    this.#configs = configs
    this.#componentManager = new ComponentManager(configs)
    this.#mediaManager = new MediaManager(configs)
    this.#paletteManager = new PaletteManager(configs)
    this.#scaleManager = new ScaleManager(configs)
    this.#variableManager = new VariableManager(configs)
    this.#variantManager = new VariantManager(configs)
    this.global = configs?.global
  }

  #configsMerge(...configs: Configs[]): Configs {
    return {
      ...this.#componentManager.configsMerge(...configs),
      ...this.#mediaManager.configsMerge(...configs),
      ...this.#paletteManager.configsMerge(...configs),
      ...this.#scaleManager.configsMerge(...configs),
      ...this.#variableManager.configsMerge(...configs),
      ...this.#variantManager.configsMerge(...configs),
    }
  }

  extends(configs: Configs): Theme {
    const configsToMerge = this.#configs ? [this.#configs, configs] : [configs]
    return new Theme(this.#configsMerge(...configsToMerge))
  }

  getComponent<Props extends ObjectLiteral>(
    configs: ConfigsComponent<Props>,
  ): ComponentType<Props> | undefined {
    return this.#componentManager.get(configs)
  }

  getMedia(name: MediaName): Media | undefined {
    return this.#mediaManager.get(name)
  }

  getPaletteColor(configs: ConfigsPalette): ColorHex | undefined {
    return this.#paletteManager.getColor(configs)
  }

  getPropsVariant<Props extends ObjectLiteral>(
    props: WithThemeVariant<Props>,
    propsDefault?: Partial<WithThemeVariant<Props>>,
  ): WithThemeVariant<Props> {
    const propsWithDefault = objectDefaults(props, propsDefault)
    const variant = this.#variantManager.get({ theme: this, ...propsWithDefault })

    return objectDefaults(props, variant, propsDefault)
  }

  // TODO: check if the right approach
  getPropsVariantByDefinitions<Props extends ObjectLiteral>(
    definitions: (props: Props) => WithThemeVariant<Props>[],
    props: WithThemeVariant<Props>,
    propsDefault?: Partial<WithThemeVariant<Props>>,
    mergeKeys: Array<keyof Props> = [],
  ): WithThemeVariant<Props> {
    const propsWithDefault = objectDefaults(props, propsDefault)
    const variants = definitions(propsWithDefault).map((definition) => {
      const configs = objectDefaults(definition, propsWithDefault)
      return this.#variantManager.get({ theme: this, ...configs }) ?? undefined
    })

    return objectDefaultsDeepByKeys(mergeKeys, props, ...variants, propsDefault)
  }

  getScaleBreakpoint(configs: ConfigsScale): TokenBreakpoint[] {
    return this.#scaleManager.getScaleBreakpoint(configs)
  }

  getScaleItem<Type extends ScaleItem = ScaleItem>(configs: ConfigsScale): Type | undefined {
    return this.#scaleManager.getScaleItem(configs) as Type
  }

  getVariable<Type>(name: string): Type | undefined {
    return this.#variableManager.get<Type>(name)
  }
}
