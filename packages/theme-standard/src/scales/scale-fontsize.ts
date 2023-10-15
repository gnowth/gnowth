import type { ScaleType, TokenFontSize } from '@gnowth/lib-theme'

export const fontsize = {
  md: {
    x10: '.625rem', // 10px
    x100: '1.0625rem', // 17px
    x1000: '3.0625rem', // 49px
    x1100: '3.4375rem', // 55px
    x1200: '3.875rem', // 62px
    x1300: '4.375rem', // 70px
    x200: '1.1875rem', // 19px
    x25: '.75rem', // 12px
    x300: '1.375rem', // 22px
    x400: '1.5rem', // 24px
    x50: '.8125', // 13px
    x500: '1.6875rem', // 27px
    x600: '1.9375rem', // 31px
    x700: '2.125rem', // 34px
    x75: '.9375rem', // 15px
    x800: '2.4375rem', // 39px
    x900: '2.75rem', // 44px
  },

  none: {
    x10: '.5rem', // 8px
    x100: '.875rem', // 14px
    x1000: '2.5rem', // 40px
    x1100: '2.8125rem', // 45px
    x1200: '3.125rem', // 50px
    x1300: '3.75rem', // 60px
    x200: '1rem', // 16px
    x25: '.625rem', // 10px
    x300: '1.125rem', // 18px
    x400: '1.25rem', // 20px
    x50: '.6875rem', // 11px
    x500: '1.375rem', // 22px
    x600: '1.5625rem', // 25px
    x700: '1.75rem', // 28px
    x75: '.75rem', // 12px
    x800: '2rem', // 32px
    x900: '2.25rem', // 36px
  },

  responsive: true,
} satisfies ScaleType<TokenFontSize>
