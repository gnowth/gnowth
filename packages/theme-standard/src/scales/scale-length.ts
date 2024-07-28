import type { ScaleType } from '@gnowth/lib-theme'

import { guardString } from '@gnowth/lib-utils'

export const length = ((configs: { scaleToken?: number | string }) => {
  if (!configs.scaleToken) {
    return undefined
  }

  return guardString(configs.scaleToken) ? configs.scaleToken : `${configs.scaleToken * 100}%`
}) satisfies ScaleType
