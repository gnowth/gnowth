import type { ScaleType, TokenFontSize } from '@gnowth/lib-theme'

export const fontsize = {
  md: {
    x0010: '.625rem', // 10px
    x0025: '.75rem', // 12px
    x0050: '.8125', // 13px
    x0075: '.9375rem', // 15px
    x0100: '1.0625rem', // 17px
    x0200: '1.1875rem', // 19px
    x0300: '1.375rem', // 22px
    x0400: '1.5rem', // 24px
    x0500: '1.6875rem', // 27px
    x0600: '1.9375rem', // 31px
    x0700: '2.125rem', // 34px
    x0800: '2.4375rem', // 39px
    x0900: '2.75rem', // 44px
    x1000: '3.0625rem', // 49px
    x1100: '3.4375rem', // 55px
    x1200: '3.875rem', // 62px
    x1300: '4.375rem', // 70px
  },

  none: {
    x0010: '.5rem', // 8px
    x0025: '.625rem', // 10px
    x0050: '.6875rem', // 11px
    x0075: '.75rem', // 12px
    x0100: '.875rem', // 14px
    x0200: '1rem', // 16px
    x0300: '1.125rem', // 18px
    x0400: '1.25rem', // 20px
    x0500: '1.375rem', // 22px
    x0600: '1.5625rem', // 25px
    x0700: '1.75rem', // 28px
    x0800: '2rem', // 32px
    x0900: '2.25rem', // 36px
    x1000: '2.5rem', // 40px
    x1100: '2.8125rem', // 45px
    x1200: '3.125rem', // 50px
    x1300: '3.75rem', // 60px
  },

  responsive: true,
} satisfies ScaleType<TokenFontSize>
