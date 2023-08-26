import type { CSSObject } from '@emotion/css'
import type {
  MappedType,
  Namespace,
  PropsVariant,
  Theme as ITheme,
  ThemeConfigsComponent,
  ThemeConfigsPalette,
  ThemeConfigsScale,
} from '@gnowth/lib-types'
import type { ComponentType } from 'react'
import _ from 'lodash'
import { css } from '@emotion/css'
import { utils } from '@gnowth/lib-util'

import type {
  ThemeComponents,
  ThemeImages,
  ThemePalette,
  ThemePalettes,
  ThemeScales,
  ThemeVariables,
  ThemeVariants,
} from './types'

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
  [key: string]: string | ((props: Props, theme: ITheme) => CSSObject)
}

class Theme implements ITheme {
  static assembleComponents(components: Namespace<unknown>): ThemeComponents {
    return components as ThemeComponents
  }

  static assemblePalettesFromJSON(...palettes: ThemePalette[]): ThemePalettes {
    return _.keyBy(palettes, 'name')
  }

  static assembleScales(scales: ThemeScales): ThemeScales {
    return scales
  }

  static assembleVariants(variants: Namespace<unknown>): ThemeVariants {
    return variants as ThemeVariants
  }

  static createStyles<Styles extends Record<string, string>>(styles: Styles): Record<keyof Styles, string> {
    return _.mapValues(styles, (style) => css(style))
  }

  static makeStyles<Props>(configs: ConfigsMakeStyles<Props>) {
    return function styles(props: Props, theme: ITheme): MappedType<ConfigsMakeStyles<Props>, string> {
      return _.mapValues(configs, (makeStyles) =>
        _.isString(makeStyles) ? css(makeStyles) : css(makeStyles(props, theme)),
      )
    }
  }

  static makeDefinitions(prefixes: string[]) {
    return <Props extends PropsVariant<Props>>(props: Props): PropsVariant<Props>[] =>
      prefixes.map((prefix) => ({
        variant: prefix ? props[`${prefix}Variant` as 'variant'] : props.variant,
        variantLocals: prefix ? props[`${prefix}VariantLocals` as 'variantLocals'] : props.variantLocals,
        variantNamespace: prefix
          ? props[`${prefix}VariantNamespace` as 'variantNamespace']
          : props.variantNamespace,
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

  extends(configs: Configs): ITheme {
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
    if (!_.isString(configs.component)) return configs.component

    const components = utils.defaults(
      configs.components,
      this.components[configs.namespace || 'type'] as Record<string, ComponentType<Props>>,
    )

    return components[configs.component]
  }

  // TODO add opacity to palette?
  getPaletteColor(configs: ThemeConfigsPalette): string | undefined {
    if (!configs.palette) return undefined

    const { paletteWeight = '500' } = configs
    const maybePalette = this.palettes[configs.palette]
    const palette = _.isString(maybePalette) ? this.palettes[maybePalette] : maybePalette

    if (_.isString(palette)) return undefined

    const colorDefinition = palette?.colors.find((color) => color.name === paletteWeight)

    if (!colorDefinition) return undefined

    if (!configs.paletteForContrast) return colorDefinition.hex

    const maybePaletteText = this.palettes[colorDefinition.darkContrast ? 'textPrimary' : 'textInverse']

    const paletteText = _.isString(maybePaletteText) ? this.palettes[maybePaletteText] : maybePaletteText

    if (_.isString(paletteText)) return undefined

    const colorDefinitionText = paletteText?.colors.find((color) => color.name === '500')

    return colorDefinitionText?.hex
  }

  getScaleItem(configs: ThemeConfigsScale): string | undefined {
    const scale = _.isString(configs.scale) ? this.scales[configs.scale] : configs.scale

    if (configs.token === undefined) return undefined

    const maybeTokenString = _.isString(configs.token) ? configs.token : undefined

    return scale?.(configs.token) ?? maybeTokenString
  }

  getVariable<Type>(name: string): Type | undefined {
    return this.variables[name] as Type
  }

  getVariant<Props extends PropsVariant<Props>>(props: Props, propsDefault?: Partial<Props>): Props {
    const propsWithDefault = utils.defaults(props, propsDefault)

    const variant = this.getVariantPartial(propsWithDefault, propsWithDefault)

    return utils.defaults(props, variant, propsDefault)
  }

  // TODO: fix all types around getVariant
  getVariantPartial<Props extends PropsVariant<Props>>(
    configs: PropsVariant<Props>,
    propsWithDefault: Props,
  ): Props {
    if (!configs.variantNamespace || !configs.variant) return {} as Props

    if (_.isObject(configs.variant)) return configs.variant as Props

    const variants = this.variants as ThemeVariants<Props>
    const variantRecord = utils.defaults(variants[configs.variantNamespace], configs.variantLocals)

    const variantMaybe = variantRecord[configs.variant]
    const variant = _.isFunction(variantMaybe) ? variantMaybe(this, propsWithDefault) : variantMaybe

    return (variant || {}) as Props
  }

  getVariantByDefinitions<Props extends PropsVariant<Props>>(
    definitions: (props: Props) => PropsVariant<Props>[],
    props: Props,
    propsDefault?: Partial<Props>,
    mergeKeys: Array<keyof Props> = [],
  ): Props {
    const propsWithDefault = utils.defaults(props, propsDefault)

    const variants = definitions(propsWithDefault).map((definition) =>
      this.getVariantPartial(definition, propsWithDefault),
    )

    return utils.defaultsDeepByKeys(mergeKeys, props, ...variants, propsDefault)
  }
}

export default Theme
