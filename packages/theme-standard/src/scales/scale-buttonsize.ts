import type { ScaleType, TokenSize } from '@gnowth/lib-theme'

export const buttonsize = {
  lg: '3rem', // 48px
  md: '2.5rem', // 40px
  sm: '2rem', // 32px
  xl: '4rem', // 64px
  xs: '1.5rem', // 30px
  xxl: '8rem', // 128px
  xxs: '1rem', // 24px
  xxxl: '16rem', // 256px
} satisfies ScaleType<TokenSize>

export const fabsize = {
  lg: '4.5rem', // 72px
  md: '3.5rem', // 56px
  sm: '2.5rem', // 40px
  xl: '6rem', // 96px
  xs: '2rem', // 32px
  xxl: '10rem', // 160px
  xxs: '1.5rem', // 24px
  xxxl: '18rem', // 288px
} satisfies ScaleType<TokenSize>
