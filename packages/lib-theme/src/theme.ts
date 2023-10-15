import type { CSSObject } from '@emotion/css'
import type { ComponentType } from 'react'
import { css } from '@emotion/css'
import {
  arrayKeyBy,
  guardFunction,
  guardObject,
  guardString,
  objectDefaults,
  objectMapValues,
} from '@gnowth/lib-utils'

import { objectDefaultsDeepByKeys } from './theme.utils'

import type {
  ThemeComponents,
  ThemeImages,
  ThemeNamespace,
  ThemePalette,
  ThemePalettes,
  ThemeScales,
  ThemeVariables,
  ThemeVariants,
} from './types'

interface ThemeConfigsComponent<Props> {
  component?: ComponentType<Props> | string
  componentNamespace?: string
  components?: Record<string, ComponentType<Props> | undefined>
}

interface ThemeConfigsPalette {
  palette?: string
  paletteForContrast?: boolean
  paletteWeight?: string | number
}

type ThemeScale = (token: number | string) => string | undefined

interface ThemeConfigsScale {
  scale?: ThemeScale | string
  token?: string | number
}

type MappedType<Type, ToType> = {
  [Key in keyof Type]: ToType
}

type ThemeVariant<Props = Record<string, unknown>> =
  | Partial<Props>
  | ((theme: Theme, propsWithDefault: Props) => Partial<Props>)

interface PropsVariant<Props> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
  variantNamespace?: string
  variants?: Record<string, ThemeVariant<Props> | undefined>
}

interface Configs {
  components?: ThemeComponents
  fonts?: unknown
  images?: ThemeImages
  palettes?: ThemePalettes
  scales?: ThemeScales
  stylesheets?: unknown
  variables?: ThemeVariables
  variants?: ThemeVariants
}

interface ConfigsMakeStyles<Props> {
  [key: string]: string | ((props: Props, theme: Theme) => CSSObject)
}

export class Theme {
  static assembleComponents(components: ThemeNamespace<unknown>): ThemeComponents {
    return components as ThemeComponents
  }

  static assemblePalettesFromJSON(...palettes: ThemePalette[]): ThemePalettes {
    return arrayKeyBy(palettes, (palette) => palette.name)
  }

  static assembleScales(scales: ThemeScales): ThemeScales {
    return scales
  }

  static assembleVariants(variants: ThemeNamespace<unknown>): ThemeVariants {
    return variants as ThemeVariants
  }

  static createStyles<Styles extends Record<string, string>>(styles: Styles): Record<keyof Styles, string> {
    return objectMapValues(styles, (style) => css(style))
  }

  static makeStyles<Props>(configs: ConfigsMakeStyles<Props>) {
    return function styles(props: Props, theme: Theme): MappedType<ConfigsMakeStyles<Props>, string> {
      return objectMapValues(configs, (makeStyles) =>
        guardString(makeStyles) ? css(makeStyles) : css(makeStyles(props, theme)),
      )
    }
  }

  static makeDefinitions(prefixes: string[]) {
    return <Props extends PropsVariant<Props>>(props: Props): PropsVariant<Props>[] =>
      prefixes.map((prefix) => ({
        variant: prefix ? props[`${prefix}Variant` as 'variant'] : props.variant,
        variantNamespace: prefix
          ? props[`${prefix}VariantNamespace` as 'variantNamespace']
          : props.variantNamespace,
        variants: prefix ? props[`${prefix}Variants` as 'variants'] : props.variants,
      }))
  }

  components: ThemeComponents

  images: ThemeImages

  palettes: ThemePalettes

  scales: ThemeScales

  variables: ThemeVariables

  variants: ThemeVariants

  constructor(configs: Configs) {
    this.components = configs.components || {}
    this.images = configs.images || {}
    this.palettes = configs.palettes || {}
    this.scales = configs.scales || {}
    this.variables = configs.variables || {}
    this.variants = configs.variants || {}
  }

  extends(configs: Configs): Theme {
    const configsNew = {
      components: { ...this.components, ...configs.components },
      images: { ...this.images, ...configs.images },
      palettes: { ...this.palettes, ...configs.palettes },
      scales: { ...this.scales, ...configs.scales },
      variables: { ...this.variables, ...configs.variables },
      variants: { ...this.variants, ...configs.variants },
    }

    return new Theme(configsNew)
  }

  getComponent<Props>(configs: ThemeConfigsComponent<Props>): ComponentType<Props> | undefined {
    if (!guardString(configs.component)) return configs.component

    const components = objectDefaults(
      configs.components ?? {},
      this.components[configs.componentNamespace || 'type'] as Record<string, ComponentType<Props>>,
    )

    return components[configs.component]
  }

  // TODO add opacity to palette?
  getPaletteColor(configs: ThemeConfigsPalette): string | undefined {
    if (!configs.palette) return undefined

    const { paletteWeight = '500' } = configs
    const maybePalette = this.palettes[configs.palette]
    const palette = guardString(maybePalette) ? this.palettes[maybePalette] : maybePalette

    if (guardString(palette)) return undefined

    const colorDefinition = palette?.colors.find((color) => color.name === paletteWeight)

    if (!colorDefinition) return undefined

    if (!configs.paletteForContrast) return colorDefinition.hex

    const maybePaletteText = this.palettes[colorDefinition.darkContrast ? 'textPrimary' : 'textInverse']

    const paletteText = guardString(maybePaletteText) ? this.palettes[maybePaletteText] : maybePaletteText

    if (guardString(paletteText)) return undefined

    const colorDefinitionText = paletteText?.colors.find((color) => color.name === '500')

    return colorDefinitionText?.hex
  }

  getScaleItem(configs: ThemeConfigsScale): string | undefined {
    const scale = guardString(configs.scale) ? this.scales[configs.scale] : configs.scale

    if (configs.token === undefined) return undefined

    const maybeTokenString = guardString(configs.token) ? configs.token : undefined

    return scale?.(configs.token) ?? maybeTokenString
  }

  getVariable<Type>(name: string): Type | undefined {
    return this.variables[name] as Type
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
