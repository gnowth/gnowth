import { TokenIconSize } from '@gnowth/lib-token'

const iconsizes: Record<number | string, string | undefined> = {
  [TokenIconSize.xxs]: '.5rem', // 8px
  [TokenIconSize.xs]: '1rem', // 16px
  [TokenIconSize.sm]: '1.5rem', // 24px
  [TokenIconSize.md]: '2rem', // 32px
  [TokenIconSize.lg]: '3rem', // 48px
  [TokenIconSize.xl]: '4rem', // 64px
  [TokenIconSize.xxl]: '8rem', // 128px
  [TokenIconSize.xxxl]: '16rem', // 256px
}

export default (token: TokenIconSize | string): string | undefined => iconsizes[token]
