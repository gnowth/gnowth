import type { ScaleType } from '@gnowth/lib-theme'
import { TokenFontSize } from '@gnowth/lib-token'

const fontsizesMobile: Record<number | string, string | undefined> = {
  [TokenFontSize.x10]: '.625rem', // 10px
  [TokenFontSize.x25]: '.75rem', // 12px
  [TokenFontSize.x50]: '.8125', // 13px
  [TokenFontSize.x75]: '.9375rem', // 15px
  [TokenFontSize.x100]: '1.0625rem', // 17px
  [TokenFontSize.x200]: '1.1875rem', // 19px
  [TokenFontSize.x300]: '1.375rem', // 22px
  [TokenFontSize.x400]: '1.5rem', // 24px
  [TokenFontSize.x500]: '1.6875rem', // 27px
  [TokenFontSize.x600]: '1.9375rem', // 31px
  [TokenFontSize.x700]: '2.125rem', // 34px
  [TokenFontSize.x800]: '2.4375rem', // 39px
  [TokenFontSize.x900]: '2.75rem', // 44px
  [TokenFontSize.x1000]: '3.0625rem', // 49px
  [TokenFontSize.x1100]: '3.4375rem', // 55px
  [TokenFontSize.x1200]: '3.875rem', // 62px
  [TokenFontSize.x1300]: '4.375rem', // 70px
}

const fontsizesDesktop: Record<number | string, string | undefined> = {
  [TokenFontSize.x10]: '.5rem', // 8px
  [TokenFontSize.x25]: '.625rem', // 10px
  [TokenFontSize.x50]: '.6875rem', // 11px
  [TokenFontSize.x75]: '.75rem', // 12px
  [TokenFontSize.x100]: '.875rem', // 14px
  [TokenFontSize.x200]: '1rem', // 16px
  [TokenFontSize.x300]: '1.125rem', // 18px
  [TokenFontSize.x400]: '1.25rem', // 20px
  [TokenFontSize.x500]: '1.375rem', // 22px
  [TokenFontSize.x600]: '1.5625rem', // 25px
  [TokenFontSize.x700]: '1.75rem', // 28px
  [TokenFontSize.x800]: '2rem', // 32px
  [TokenFontSize.x900]: '2.25rem', // 36px
  [TokenFontSize.x1000]: '2.5rem', // 40px
  [TokenFontSize.x1100]: '2.8125rem', // 45px
  [TokenFontSize.x1200]: '3.125rem', // 50px
  [TokenFontSize.x1300]: '3.75rem', // 60px
}

// TODO: remove desktop=true default
export const fontsize: ScaleType = (token: TokenFontSize | string, desktop = true): string | undefined =>
  desktop ? fontsizesDesktop[token] : fontsizesMobile[token]
