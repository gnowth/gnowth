import { TokenVariable } from './wip-token-variable'

export enum TokenFont {
  header = 0,
  body,
}

export const TokenFontToVariable = {
  [TokenFont.body]: TokenVariable.fontBody,
  [TokenFont.header]: TokenVariable.fontHeader,
}
