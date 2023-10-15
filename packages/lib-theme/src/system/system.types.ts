import type { CSSObject } from '@emotion/css'
import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { Theme } from '../theme'

export type SystemType<Type extends System<ObjectLiteral>> = Parameters<Type>[0]
export type System<SystemType> = (system: SystemType, theme: Theme) => CSSObject
export type SystemInterpolate<Type> = Type | Record<string, Type>
