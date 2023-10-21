import type { ObjectLiteral } from '@gnowth/lib-utils'
import type { ComponentType } from 'react'

import type { Theme } from './theme.next'
import type { ConfigsWithDependencies } from './theme.types'
import type { ServiceThemeMedia, Media, MediaName } from './theme-media.service'
import type { ConfigsComponent, ServiceThemeComponent } from './theme-component.service'
import type { ConfigsPalette, ColorHex, ServiceThemePalette } from './theme-palette.service'
import type { ConfigsScale, ScaleItem, ServiceThemeScale } from './theme-scale.service'
import type { ServiceThemeVariable } from './theme-variable.service'
import type { ConfigsVariant, ServiceThemeVariant, Variant } from './theme-variant.service'

type ConfigsPropsVariants<Props extends ObjectLiteral> = Omit<ConfigsVariant<Props>, 'theme'>

export class ServiceTheme {
  #configs: ConfigsWithDependencies
  #serviceThemeComponent: ServiceThemeComponent
  #serviceThemeMedia: ServiceThemeMedia
  #serviceThemePalette: ServiceThemePalette
  #serviceThemeScale: ServiceThemeScale
  #serviceThemeVariable: ServiceThemeVariable
  #serviceThemeVariant: ServiceThemeVariant

  constructor(configs: ConfigsWithDependencies) {
    this.#configs = configs
    this.#serviceThemeComponent = configs.dependencies.serviceThemeComponent
    this.#serviceThemeMedia = configs.dependencies.serviceThemeMedia
    this.#serviceThemePalette = configs.dependencies.serviceThemePalette
    this.#serviceThemeScale = configs.dependencies.serviceThemeScale
    this.#serviceThemeVariable = configs.dependencies.serviceThemeVariable
    this.#serviceThemeVariant = configs.dependencies.serviceThemeVariant
  }

  extends(configs: ConfigsWithDependencies): Theme {
    return new ServiceTheme(this.#configsMerge(this.#configs, configs))
  }

  getComponent<Props extends ObjectLiteral>(
    configs: ConfigsComponent<Props>,
  ): ComponentType<Props> | undefined {
    return this.#serviceThemeComponent.getComponent(configs)
  }

  getMedia(name: MediaName): Media | undefined {
    return this.#serviceThemeMedia.getMedia(name)
  }

  getPaletteColor(configs: ConfigsPalette): ColorHex | undefined {
    return this.#serviceThemePalette.getColor(configs)
  }

  getScaleItem<Type extends ScaleItem = ScaleItem>(configs: ConfigsScale): Type | undefined {
    return this.#serviceThemeScale.getScaleItem(configs) as Type
  }

  getVariable<Type>(name: string): Type | undefined {
    return this.#serviceThemeVariable.getVariable<Type>(name)
  }

  getPropsVariant<Props extends ObjectLiteral>(
    ...configs: ConfigsPropsVariants<Props>[]
  ): Variant<Props> | undefined {
    return this.#serviceThemeVariant.getVariant(
      configs.map((config) => ({ theme: this, ...config }) as ConfigsVariant<Props>),
    )
  }

  // TODO: check if the right approach
  getPropsVariantByDefinitions<Props extends ObjectLiteral>(
    definitions: (props: Props) => Variant<Props>[],
    props: Props,
    propsDefault?: Partial<Props>,
    mergeKeys: Array<keyof Props> = [],
  ): Props {
    return this.#serviceThemeVariant.getVariantByDefinitions(
      definitions,
      this,
      props,
      propsDefault,
      mergeKeys,
    )
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
