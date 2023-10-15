import type { ComponentType } from 'react'

import type { Theme } from './theme'
export type { SystemType, PaletteType, System } from './types'

interface Color {
  darkContrast: boolean
  hex: string
  name: string
}

export interface ThemePalette {
  base: string
  colors: Color[]
  name: string
}

export interface ThemeNamespace<Type> {
  [namespace: string]: Record<string, Type | undefined> | undefined
}

type ThemeVariable = unknown
export type ThemeVariant<Props = Record<string, unknown>> =
  | Partial<Props>
  | ((theme: Theme, propsWithDefault: Props) => Partial<Props>)

// eslint-disable-next-line @typescript-eslint/ban-types
export type ThemeComponents<Props = {}> = ThemeNamespace<ComponentType<Props>>
export type ThemeImages = Record<string, string | undefined>
export type ThemeScale = (token: number | string) => string | undefined
export type ThemeScales = Record<string, ThemeScale | undefined>
export type ThemeVariables = Record<string, ThemeVariable | undefined>
export type ThemeVariants<Props = Record<string, unknown>> = ThemeNamespace<ThemeVariant<Props>>
export type ThemePalettes = Record<string, ThemePalette | string | undefined>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VariantType<Type> = Partial<Type> | ((theme: Theme, props?: any) => Type)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ScaleType = any
