import { TokenVariable } from './token-variable'

export enum TokenFont {
  header = 0,
  body,
}

export const TokenFontToVariable = {
  [TokenFont.header]: TokenVariable.fontHeader,
  [TokenFont.body]: TokenVariable.fontBody,
}
