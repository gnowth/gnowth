import type { Namespace, Theme } from '@gnowth/lib-types'
import type { ComponentType } from 'react'

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

type ThemeVariable = unknown
export type ThemeVariant<Props = Record<string, unknown>> =
  | Partial<Props>
  | ((theme: Theme, propsWithDefault: Props) => Partial<Props>)

// eslint-disable-next-line @typescript-eslint/ban-types
export type ThemeComponents<Props = {}> = Namespace<ComponentType<Props>>
export type ThemeImages = Record<string, string | undefined>
export type ThemeScale = (token: number | string) => string | undefined
export type ThemeScales = Record<string, ThemeScale | undefined>
export type ThemeVariables = Record<string, ThemeVariable | undefined>
export type ThemeVariants<Props = Record<string, unknown>> = Namespace<ThemeVariant<Props>>
export type ThemePalettes = Record<string, ThemePalette | string | undefined>
