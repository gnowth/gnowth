import type { CSSObject } from '@emotion/css'
import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { Theme } from '../theme/theme'

export type SystemType<Type extends System<ObjectLiteral>> = Parameters<Type>[0]
export type System<SystemType> = (system: SystemType, theme: Theme) => CSSObject
export type SystemInterpolate<Type> = Type | Record<string, Type>

type SystemUnitsAbsolute =
  | `${number}cm`
  | `${number}mm`
  | `${number}in`
  | `${number}px`
  | `${number}pt`
  | `${number}pc`
type SystemUnitsRelative =
  | `${number}em`
  | `${number}ex`
  | `${number}ch`
  | `${number}rem`
  | `${number}vw`
  | `${number}vh`
  | `${number}vmin`
  | `${number}vmax`
  | `${number}%`
export type SystemUnits = SystemUnitsAbsolute | SystemUnitsRelative
