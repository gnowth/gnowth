import type { ObjectLiteral } from '@gnowth/lib-utils'
import type { ComponentType } from 'react'

import type { Theme } from './theme'
import type { ConfigsWithDependencies } from './theme.types'
import type { ServiceThemeMedia, Media, MediaName } from './theme-media.service'
import type { ConfigsComponent, ServiceThemeComponent } from './theme-component.service'
import type { ConfigsPalette, ColorHex, ServiceThemePalette } from './theme-palette.service'
import type { ConfigsScale, ScaleItem, ServiceThemeScale } from './theme-scale.service'
import type { ServiceThemeVariable } from './theme-variable.service'
import type { ConfigsVariant, ServiceThemeVariant, Variant } from './theme-variant.service'

export class ServiceTheme {
  #configs: ConfigsWithDependencies
  #serviceThemeComponent: ServiceThemeComponent
  #serviceThemeMedia: ServiceThemeMedia
  #serviceThemePalette: ServiceThemePalette
  #serviceThemeScale: ServiceThemeScale
  #serviceThemeVariable: ServiceThemeVariable
  #serviceThemeVariant: ServiceThemeVariant

  constructor(configs: ConfigsWithDependencies) {
    const {
      ServiceThemeComponent,
      ServiceThemeMedia,
      ServiceThemePalette,
      ServiceThemeScale,
      ServiceThemeVariable,
      ServiceThemeVariant,
    } = configs.dependencies
    const configsWithTheme = {
      theme: this,
      ...configs,
    }

    this.#configs = configs
    this.#serviceThemeComponent = new ServiceThemeComponent(configsWithTheme)
    this.#serviceThemeMedia = new ServiceThemeMedia(configsWithTheme)
    this.#serviceThemePalette = new ServiceThemePalette(configsWithTheme)
    this.#serviceThemeScale = new ServiceThemeScale(configsWithTheme)
    this.#serviceThemeVariable = new ServiceThemeVariable(configsWithTheme)
    this.#serviceThemeVariant = new ServiceThemeVariant(configsWithTheme)
  }

  extends(configs: ConfigsWithDependencies): Theme {
    return new ServiceTheme(this.#configsMerge(this.#configs, configs))
  }

  getComponent<Props extends ObjectLiteral>(configs: ConfigsComponent<Props>): ComponentType<Props> | null {
    return this.#serviceThemeComponent.getComponent(configs)
  }

  getMedia(name: MediaName): Media | undefined {
    return this.#serviceThemeMedia.getMedia(name)
  }

  getPaletteColor(configs: ConfigsPalette): ColorHex | null {
    return this.#serviceThemePalette.getColor(configs)
  }

  getScaleItem<Type extends ScaleItem = ScaleItem>(configs: ConfigsScale): Type | null {
    return this.#serviceThemeScale.getScaleItem(configs) as Type
  }

  // TODO: check if exception for not sending null is valid
  getVariable<Type>(name: string): Type | undefined {
    return this.#serviceThemeVariable.getVariable<Type>(name)
  }

  getVariant<Props extends ObjectLiteral>(...configs: ConfigsVariant<Props>[]): Variant<Props> | null {
    return this.#serviceThemeVariant.getVariant(configs)
  }

  // TODO: check if the right approach
  getVariantByDefinitions<Props extends ObjectLiteral>(
    definitions: (props: Props) => Variant<Props>[],
    props: Props,
    propsDefault?: Partial<Props>,
    mergeKeys: Array<keyof Props> = [],
  ): Props {
    return this.#serviceThemeVariant.getVariantByDefinitions(definitions, props, propsDefault, mergeKeys)
  }

  #configsMerge(...configs: ConfigsWithDependencies[]): ConfigsWithDependencies {
    return {
      ...this.#serviceThemeComponent.configsMerge(...configs),
      ...this.#serviceThemeMedia.configsMerge(...configs),
      ...this.#serviceThemePalette.configsMerge(...configs),
      ...this.#serviceThemeScale.configsMerge(...configs),
      ...this.#serviceThemeVariable.configsMerge(...configs),
      ...this.#serviceThemeVariant.configsMerge(...configs),
      dependencies: Object.assign({}, ...configs.map((config) => config.dependencies)),
    }
  }
}
