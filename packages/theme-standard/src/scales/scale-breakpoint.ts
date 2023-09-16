import { TokenBreakpoint } from '@gnowth/lib-token'

const breakpoints: Record<number | string, string | undefined> = {
  [TokenBreakpoint.xxs]: '22.5em', // 360px
  [TokenBreakpoint.xs]: '30em', // 480px
  [TokenBreakpoint.sm]: '37.5em', // 600px
  [TokenBreakpoint.md]: '45em', // 720px
  [TokenBreakpoint.lg]: '56.25em', // 900px
  [TokenBreakpoint.xl]: '75em', // 1200px
  [TokenBreakpoint.xxl]: '112.5em', // 1800px
}

export const breakpoint = (token: TokenBreakpoint | string): string | undefined => breakpoints[token]
