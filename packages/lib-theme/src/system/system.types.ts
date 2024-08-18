import type { CSSObject } from '@emotion/serialize'
import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { Theme } from '../theme/theme'

export type SystemType<Type extends System<ObjectLiteral>> = Parameters<Type>[0]
export type System<SystemType> = (system: SystemType, theme: Theme) => CSSObject
export type SystemInterpolate<Type> = Record<string, Type> | Type

type SystemUnitsAbsolute =
  | `${number}cm`
  | `${number}in`
  | `${number}mm`
  | `${number}pc`
  | `${number}pt`
  | `${number}px`
type SystemUnitsRelative =
  | `${number}%`
  | `${number}ch`
  | `${number}em`
  | `${number}ex`
  | `${number}rem`
  | `${number}vh`
  | `${number}vmax`
  | `${number}vmin`
  | `${number}vw`
export type SystemUnits = SystemUnitsAbsolute | SystemUnitsRelative
