import type { ScaleType } from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'

export const length: ScaleType = (token: number | string): string =>
  guardString(token) ? token : `${token * 100}%`
