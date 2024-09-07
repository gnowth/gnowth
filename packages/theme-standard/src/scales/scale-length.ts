import type { ScaleType } from '@gnowth/lib-theme'

import * as R from 'remeda'

export const length = ((configs: { scaleToken?: number | string }) => {
  if (!configs.scaleToken) {
    return undefined
  }
  const ratio: Record<string, number | string> = {
    full: 1,
    half: 0.5,
    lg: '3rem', // 48px
    md: '2.5rem', // 40px
    none: '0rem',
    quarter: 0.25,
    sm: '2rem', // 32px
    tenth: 0.1,
    third: 1 / 3,
    xl: '4rem', // 64px
    xs: '1.5rem', // 24px
    xxl: '8rem', // 128px
    xxs: '1rem', // 16px
    xxxl: '16rem', // 256px
  }
  const value = ratio[configs.scaleToken] ?? configs.scaleToken
  return R.isString(value) ? value : `${value * 100}%`
}) satisfies ScaleType
