import type { ScaleType, TokenBreakpoint } from '@gnowth/lib-theme'

export const breakpoint = {
  lg: '56.25em', // 900px
  md: '45em', // 720px
  none: '0em',
  sm: '37.5em', // 600px
  xl: '75em', // 1200px
  xs: '30em', // 480px
  xxl: '112.5em', // 1800px
  xxs: '22.5em', // 360px
} satisfies ScaleType<TokenBreakpoint>
