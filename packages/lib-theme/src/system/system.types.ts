import { CSSObject } from '@emotion/serialize'
import { ObjectLiteral } from '@gnowth/lib-utils'

import { Theme } from '../theme/theme'
import { TokenLength, TokenPropertyValue, TokenSize } from '../tokens/tokens'

export type CSSLength = string | SystemUnits | TokenLength | TokenPropertyValue
export type CSSSpace = SystemUnits | TokenPropertyValue | TokenSize
export type System<SystemType> = (system: SystemType, theme: Theme) => CSSObject

export type SystemInterpolate<Type> = Record<string, Record<string, Type>> | Record<string, Type> | Type
export type SystemType<Type extends System<ObjectLiteral>> = Parameters<Type>[0]
export type SystemUnits = SystemUnitsAbsolute | SystemUnitsRelative

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
