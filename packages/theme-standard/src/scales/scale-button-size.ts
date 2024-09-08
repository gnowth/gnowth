import type { ScaleType, TokenSize } from '@gnowth/lib-theme'

export const buttonSize = {
  lg: '3rem', // 48px
  md: '2.5rem', // 40px
  none: '0rem',
  sm: '2rem', // 32px
  xl: '4rem', // 64px
  xs: '1.5rem', // 30px
  xxl: '8rem', // 128px
  xxs: '1rem', // 24px
  xxxl: '16rem', // 256px
} satisfies ScaleType<TokenSize>
