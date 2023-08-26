import type { ComponentType } from 'react'

export interface ThemeConfigsComponent<Props> {
  component?: ComponentType<Props> | string
  components?: Record<string, ComponentType<Props> | undefined>
  namespace?: string
}

export interface ThemeConfigsPalette {
  palette?: string
  paletteForContrast?: boolean
  paletteWeight?: string | number
}

type ThemeScale = (token: number | string) => string | undefined

export interface ThemeConfigsScale {
  scale?: ThemeScale | string
  token?: string | number
}

export type ThemeVariant<Props = Record<string, unknown>> =
  | Partial<Props>
  | ((theme: Theme, propsWithDefault: Props) => Partial<Props>)

export interface PropsVariant<Props> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
  variantNamespace?: string
  variantLocals?: Record<string, ThemeVariant<Props> | undefined>
}

export interface Theme {
  getComponent<Props>(configs: ThemeConfigsComponent<Props>): ComponentType<Props> | undefined
  getPaletteColor(configs: ThemeConfigsPalette): string | undefined
  getScaleItem(configs: ThemeConfigsScale): string | undefined
  getVariable<Type>(name: string): Type | undefined

  getVariant<Props extends PropsVariant<Props>>(
    props: Props,
    propsDefault?: Partial<Props>,
    variantsLocal?: Record<string, ThemeVariant<Props>>,
  ): Props

  getVariantByDefinitions<Props extends PropsVariant<Props>>(
    definitions: (props: Props) => PropsVariant<Props>[],
    props: Props,
    propsDefault?: Partial<Props>,
    mergeKeys?: Array<keyof Props>,
  ): Props
}
