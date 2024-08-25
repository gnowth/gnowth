import type { ScaleType } from '@gnowth/lib-theme'

import * as R from 'remeda'

export const length = ((configs: { scaleToken?: number | string }) => {
  if (!configs.scaleToken) {
    return undefined
  }

  return R.isString(configs.scaleToken) ? configs.scaleToken : `${configs.scaleToken * 100}%`
}) satisfies ScaleType
