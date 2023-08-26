import type { CSSObject } from '@emotion/css'
import type { Interpolate, Theme } from '@gnowth/lib-types'
import _ from 'lodash'
import { utils } from '@gnowth/lib-util'

import type { ThemeScale } from '../types'

// TODO fix utilAssignDeep assumes that if a props is an object all will be. does not take
export function systemCompose<Props>(...predicates: ((props: Props, theme: Theme) => CSSObject)[]) {
  return (props: Props, theme: Theme): CSSObject =>
    predicates.reduce(
      (styles, predicate) => utils.defaultsDeep(predicate(props, theme), styles),
      {} as CSSObject,
    )
}

interface ConfigsInterpolation<Value extends string | number> {
  key: string | string[]
  value?: Interpolate<Value>
  theme: Theme
  scale?: ThemeScale | string
  responsive?: boolean
}

// TODO add responsive scale
export function systemInterpolate<Value extends string | number>(
  configs: ConfigsInterpolation<Value>,
): CSSObject {
  if (configs.value === undefined) return {}

  const keys = Array.isArray(configs.key) ? configs.key : [configs.key]
  const makeCSSObject = (token?: Value) => {
    const scaleItem = configs.theme.getScaleItem({ token, scale: configs.scale })

    return keys.reduce((prev, current) => ({ ...prev, [current]: scaleItem }), {})
  }

  if (!_.isObject(configs.value)) return makeCSSObject(configs.value)

  return _.mapValues(configs.value, makeCSSObject)
}
