import type { ScaleType } from '@gnowth/lib-theme'

import * as R from 'remeda'

export const length = ((configs: { scaleToken?: number | string }) => {
  if (!configs.scaleToken) {
    return undefined
  }
  const ratio: Record<string, number> = {
    full: 1,
    half: 0.5,
    quarter: 0.25,
    tenth: 0.1,
    third: 1 / 3,
  }
  const value = ratio[configs.scaleToken] ?? configs.scaleToken
  return R.isString(value) ? value : `${value * 100}%`
}) satisfies ScaleType
