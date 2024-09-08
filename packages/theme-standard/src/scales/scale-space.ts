import type { ScaleType, TokenSize } from '@gnowth/lib-theme'

export const space = {
  lg: '2rem', // 32px
  md: '1.5rem', // 24px
  none: '0rem',
  sm: '1rem', // 16px
  xl: '3rem', // 48px
  xs: '.5rem', // 8px
  xxl: '4rem', // 64px
  xxs: '.25rem', // 4px
  xxxl: '8rem', // 128px
} satisfies ScaleType<TokenSize>
