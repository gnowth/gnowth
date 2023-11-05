import type { CSSObject } from '@emotion/css'
import { guardObject, objectMapValues, transformToArray } from '@gnowth/lib-utils'

import type { Theme } from '../theme/theme'
import type { ScaleName, ScaleType } from '../theme/scales'
import type { SystemInterpolate, System } from './system.types'
import { objectDefaultsDeep } from './system.utils'

type SystemCompose = <
  Type01,
  Type02,
  Type03,
  Type04,
  Type05,
  Type06,
  Type07,
  Type08,
  Type09,
  Type10,
  Type11,
  Type12,
  Type13,
  Type14,
  Type15,
>(
  system01: System<Type01>,
  system02: System<Type02>,
  system03?: System<Type03>,
  system04?: System<Type04>,
  system05?: System<Type05>,
  system06?: System<Type06>,
  system07?: System<Type07>,
  system08?: System<Type08>,
  system09?: System<Type09>,
  system10?: System<Type10>,
  system11?: System<Type11>,
  system12?: System<Type12>,
  system13?: System<Type13>,
  system14?: System<Type14>,
  system15?: System<Type15>,
) => System<
  Type01 &
    Type02 &
    Type03 &
    Type04 &
    Type05 &
    Type06 &
    Type07 &
    Type08 &
    Type09 &
    Type10 &
    Type11 &
    Type12 &
    Type13 &
    Type14 &
    Type15
>

// TODO fix utilAssignDeep assumes that if a props is an object all will be. does not take
export const systemCompose: SystemCompose =
  (...predicates) =>
  (props, theme) =>
    predicates.reduce(
      (styles, predicate) => objectDefaultsDeep(predicate!(props, theme), styles),
      {} as CSSObject,
    )

interface ConfigsInterpolation<Value extends string | number> {
  key: string | string[]
  value?: SystemInterpolate<Value>
  theme: Theme
  responsive?: boolean
  scale?: ScaleType | ScaleName
}

// TODO add responsive scale
export function systemInterpolate<Value extends string | number>(
  configs: ConfigsInterpolation<Value>,
): CSSObject {
  if (configs.value === undefined) return {}

  const keys = transformToArray(configs.key)
  const makeCSSObject = (scaleToken?: Value) => {
    const scaleItem = configs.theme.getScaleItem({ scale: configs.scale, scaleToken }) ?? scaleToken

    return keys.reduce((prev, current) => ({ ...prev, [current]: scaleItem }), {})
  }

  if (!guardObject(configs.value)) {
    return makeCSSObject(configs.value)
  }

  return objectMapValues(configs.value, makeCSSObject)
}
