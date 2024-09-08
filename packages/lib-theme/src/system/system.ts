import type { CSSObject } from '@emotion/serialize'

import { guardObject, transformToArray } from '@gnowth/lib-utils'

import type { ScaleName, ScaleType } from '../theme/scales'
import type { Theme } from '../theme/theme'
import type { TokenBreakpoint } from '../tokens/tokens'
import type { System, SystemInterpolate } from './system.types'

import { TokenVariable } from '../tokens/wip-token-variable'
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
  Type16,
  Type17,
  Type18,
  Type19,
  Type20,
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
  system16?: System<Type16>,
  system17?: System<Type17>,
  system18?: System<Type18>,
  system19?: System<Type19>,
  system20?: System<Type20>,
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
    Type15 &
    Type16 &
    Type17 &
    Type18 &
    Type19 &
    Type20
>

// TODO fix utilAssignDeep assumes that if a props is an object all will be. does not take
export const systemCompose: SystemCompose =
  (...predicates) =>
  (props, theme) =>
    predicates.reduce(
      (styles, predicate) => objectDefaultsDeep(predicate?.(props, theme) ?? {}, styles),
      {} as CSSObject,
    )

interface ConfigsInterpolation<Value extends string> {
  breakpoint?: TokenBreakpoint
  breakpointScale?: ScaleName | ScaleType
  key: string
  scale?: ScaleName | ScaleType
  theme: Theme
  value?: SystemInterpolate<Value>
}

const isBreakpoint = (key: string): key is TokenBreakpoint =>
  ['lg', 'md', 'none', 'sm', 'xl', 'xs', 'xxl', 'xxs'].includes(key)

function systemInterpolate<Value extends string>(configs: ConfigsInterpolation<Value>): CSSObject {
  if (configs.value === undefined) return {}

  if (!guardObject(configs.value)) {
    const breakpoints = configs.theme.getScaleBreakpoint(configs)
    const scaleToken = configs.value

    if (configs.breakpoint || !breakpoints.length) {
      const scaleItem =
        configs.theme.getScaleItem({
          scale: configs.scale,
          scaleBreakpoint: configs.breakpoint,
          scaleToken,
        }) ?? scaleToken
      const keys = transformToArray(configs.key)
      return keys.reduce((prev, current) => ({ ...prev, [current]: scaleItem }), {})
    }

    return breakpoints.reduce((cssObject, key) => {
      const scaleItem =
        configs.theme.getScaleItem({
          scale: configs.scale,
          scaleBreakpoint: key,
          scaleToken,
        }) ?? scaleToken
      const keys = transformToArray(configs.key)
      const newValue = keys.reduce((prev, current) => ({ ...prev, [current]: scaleItem }), {})
      const breakpoint = configs.theme.getScaleItem({
        scale: configs.breakpointScale ?? configs.theme.getVariable<string>(TokenVariable.breakpointToken),
        scaleToken: key,
      })
      if (breakpoint === '') {
        return { ...cssObject, ...newValue }
      }
      return breakpoint ? { ...cssObject, [`@media(min-width: ${breakpoint})`]: newValue } : cssObject
    }, {})
  }

  return Object.entries(configs.value).reduce((cssObject, [key, value]) => {
    const newValue = systemInterpolate({
      ...configs,
      breakpoint: isBreakpoint(key) ? key : configs.breakpoint,
      value,
    })
    if (!isBreakpoint(key)) {
      return { ...cssObject, [key]: newValue }
    }
    const breakpoint = configs.theme.getScaleItem({
      scale: configs.breakpointScale ?? configs.theme.getVariable<string>(TokenVariable.breakpointToken),
      scaleToken: key,
    })
    if (breakpoint === '') {
      return { ...cssObject, ...newValue }
    }
    return breakpoint ? { ...cssObject, [`@media(min-width: ${breakpoint})`]: newValue } : cssObject
  }, {})
}

type BuildParameters<T> = {
  breakpointScale?: ScaleName | ScaleType
  key: keyof T
  scale?: ScaleName | ScaleType
}

type BuildParametersOverride = {
  breakpointScale?: ScaleName | ScaleType
  scale?: ScaleName | ScaleType
}

export const systemMake =
  <TType extends { [k: string]: string }>(parameters: BuildParameters<TType>) =>
  (
    parametersOverride?: BuildParametersOverride,
  ): System<{ [Property in keyof TType]?: SystemInterpolate<TType[Property]> }> =>
  (props, theme) =>
    systemInterpolate<TType[keyof TType]>({
      breakpointScale: parametersOverride?.breakpointScale ?? parameters.breakpointScale,
      key: parameters.key as string,
      scale: parametersOverride?.scale ?? parameters.scale,
      theme,
      value: props[parameters.key],
    })
