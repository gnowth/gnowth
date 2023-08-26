import TokenVariable from './token-variable'

enum TokenFont {
  header = 0,
  body,
}

export const TokenFontToVariable = {
  [TokenFont.header]: TokenVariable.fontHeader,
  [TokenFont.body]: TokenVariable.fontBody,
}

export default TokenFont
