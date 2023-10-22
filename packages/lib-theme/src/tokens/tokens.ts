export * from './token-breakpoint'
export * from './token-color-weight'
export * from './token-font-size'
export * from './token-icon-size'
export * from './token-length'
export * from './token-palette'
export * from './token-property-value'
export * from './token-space'
export * from './token-z-index'
export * from './tokens.types'
export * from './wip-token-font'
export * from './wip-token-variable'

// import type { Tokens, TokenSpace } from './tokens.types'

// type Configs = {
//   tokens: Tokens
// }

// export class ModelToken {
//   tokenSpace: TokenSpace[] = ['xxs, xs, sm, md, lg, xl, xxl, xxxl']

//   constructor(configs: Configs) {
//     this.configs = configs
//     this.tokens = configs.tokens
//   }

//   isTokenSpace(value: unknown): value is TokenSpace {
//     return this.tokenSpace.includes(value)
//   }
// }
