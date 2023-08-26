import { TokenSpace } from '@gnowth/lib-token'

const spaces: Record<number | string, string | undefined> = {
  [TokenSpace.none]: '0',
  [TokenSpace.xxs]: '.25rem', // 4px
  [TokenSpace.xs]: '.5rem', // 8px
  [TokenSpace.sm]: '1rem', // 16px
  [TokenSpace.md]: '1.5rem', // 24px
  [TokenSpace.lg]: '2rem', // 32px
  [TokenSpace.xl]: '3rem', // 48px
  [TokenSpace.xxl]: '4rem', // 64px
  [TokenSpace.xxxl]: '8rem', // 128px
}

export default (token: TokenSpace | string): string | undefined => spaces[token]
