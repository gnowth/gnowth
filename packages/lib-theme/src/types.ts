import type { CSSObject } from '@emotion/css'
import type { Namespace } from '@gnowth/lib-types'
import type { ObjectLike } from '@gnowth/lib-utils'
import type { ComponentType } from 'react'

import type { Theme } from './theme'

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

export type SystemType<Type extends System<ObjectLike>> = Parameters<Type>[0]

export type System<SystemType> = (system: SystemType, theme: Theme) => CSSObject

export type Interpolate<Type> = Type | Record<string, Type>
