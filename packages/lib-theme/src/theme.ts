import type { ComponentType } from 'react'
import type { ObjectLiteral, UtilNamespaced } from '@gnowth/lib-utils'
import { guardFunction, guardObject, guardString, objectDefaults } from '@gnowth/lib-utils'

import type { ConfigsPalette, PaletteType } from './theme/theme-palette.service'
import type { ConfigsComponent } from './theme/theme-component.service'
import type { Media, MediaName } from './theme/theme-media.service'
import type { Variable } from './theme/theme-variable.service'
import { objectDefaultsDeepByKeys } from './theme/theme.utils'
import { ServiceThemePalette } from './theme/theme-palette.service'
import { ServiceThemeComponent } from './theme/theme-component.service'
import { ServiceThemeVariable } from './theme/theme-variable.service'
import { ServiceThemeMedia } from './theme/theme-media.service'

type ThemeVariants<Props = Record<string, unknown>> = UtilNamespaced<UtilNamespaced<ThemeVariant<Props>>>
type ThemeScales = Record<string, ThemeScale | undefined>
interface ThemeConfigsScale {
  scale?: ThemeScale | string
  scaleToken?: string | number
}
interface Configs {
  componentsNamespaced?: UtilNamespaced<UtilNamespaced<ComponentType>>
  medias?: UtilNamespaced<Media, MediaName>
  palettes?: PaletteType[]
  scales?: ThemeScales
  variables?: UtilNamespaced<Variable>
  variantsNamespaced?: ThemeVariants
}

export type ThemeScale = (token: number | string) => string | undefined
export type ThemeVariant<Props = Record<string, unknown>> =
  | Partial<Props>
  | ((theme: Theme, propsWithDefault: Props) => Partial<Props>)

export interface PropsVariant<Props> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
  variantNamespace?: string
  variants?: Record<string, ThemeVariant<Props> | undefined>
}

export class Theme {
  static assembleVariants(variants: UtilNamespaced<UtilNamespaced<unknown>>): ThemeVariants {
    return variants as ThemeVariants
  }

  #serviceThemeComponent: ServiceThemeComponent
  #serviceThemeMedia: ServiceThemeMedia
  #serviceThemePalette: ServiceThemePalette
  #serviceThemeVariable: ServiceThemeVariable
  scales: ThemeScales
  variants: ThemeVariants

  constructor(configs: Configs = {}) {
    this.#serviceThemeComponent = new ServiceThemeComponent(configs)
    this.#serviceThemeMedia = new ServiceThemeMedia(configs)
    this.#serviceThemePalette = new ServiceThemePalette(configs)
    this.#serviceThemeVariable = new ServiceThemeVariable(configs)

    this.scales = configs.scales || {}
    this.variants = configs.variantsNamespaced || {}
  }

  getComponent<Props extends ObjectLiteral>(
    configs: ConfigsComponent<Props>,
  ): ComponentType<Props> | undefined {
    return this.#serviceThemeComponent.getComponent(configs)
  }

  getMedia(name: MediaName): Media | undefined {
    return this.#serviceThemeMedia.getMedia(name)
  }

  getPaletteColor(configs: ConfigsPalette): string | undefined {
    return this.#serviceThemePalette.getColor(configs)
  }

  getScaleItem(configs: ThemeConfigsScale): string | undefined {
    const scale = guardString(configs.scale) ? this.scales[configs.scale] : configs.scale

    if (configs.scaleToken === undefined) return undefined

    const maybeTokenString = guardString(configs.scaleToken) ? configs.scaleToken : undefined

    return scale?.(configs.scaleToken) ?? maybeTokenString
  }

  getVariable<Type>(name: string): Type | undefined {
    return this.#serviceThemeVariable.getVariable<Type>(name)
  }

  getVariant<Props extends PropsVariant<Props>>(props: Props, propsDefault?: Partial<Props>): Props {
    const propsWithDefault = objectDefaults(props, propsDefault)

    const variant = this.getVariantPartial(propsWithDefault, propsWithDefault)

    return objectDefaults(props, variant, propsDefault)
  }

  // TODO: fix all types around getVariant
  getVariantPartial<Props extends PropsVariant<Props>>(
    configs: PropsVariant<Props>,
    propsWithDefault: Props,
  ): Props {
    if (!configs.variantNamespace || !configs.variant) return {} as Props

    if (guardObject(configs.variant)) return configs.variant as Props

    const variants = this.variants as ThemeVariants<Props>
    const variantRecord = objectDefaults(variants[configs.variantNamespace] ?? {}, configs.variants)

    const variantMaybe = variantRecord[configs.variant]
    const variant = guardFunction(variantMaybe) ? variantMaybe(this, propsWithDefault) : variantMaybe

    return (variant || {}) as Props
  }

  getVariantByDefinitions<Props extends PropsVariant<Props>>(
    definitions: (props: Props) => PropsVariant<Props>[],
    props: Props,
    propsDefault?: Partial<Props>,
    mergeKeys: Array<keyof Props> = [],
  ): Props {
    const propsWithDefault = objectDefaults(props, propsDefault)

    const variants = definitions(propsWithDefault).map((definition) =>
      this.getVariantPartial(definition, propsWithDefault),
    )

    return objectDefaultsDeepByKeys(mergeKeys, props, ...variants, propsDefault)
  }
}
