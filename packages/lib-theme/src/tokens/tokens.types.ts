import type { TokenBreakpoint } from './token-breakpoint'
import type { TokenColorWeight } from './token-color-weight'
import type { TokenFontSize } from './token-font-size'
import type { TokenIconSize } from './token-icon-size'
import type { TokenPalette } from './token-palette'
import type { TokenSpace } from './token-space'
import type { TokenZIndex } from './token-z-index'

export type TokenBase = string | number // TODO: should this be string only?
export type TokenMedia = 'screen' | 'print'

export type Tokens = {
  color?: Record<TokenPalette, string | undefined>
  breakpoint?: Record<TokenBreakpoint, string | undefined>
  fontSize?: Record<TokenFontSize, string | undefined>
  fontSizeDesktop?: Record<TokenFontSize, string | undefined>
  iconSize?: Record<TokenIconSize, string | undefined>
  palette: Record<
    string,
    {
      name: string
      colors: Record<TokenColorWeight, { hex: string; name: string }>
    }
  >
  space?: Record<TokenSpace, string | undefined>
  zIndex?: Record<TokenZIndex, string | undefined>
}

// type Palette = {
//   name: string
//   weight?: string
// }

// export type Theme = {
//   appColorForeground: Palette
//   appColorBackground: Palette
//   headerColorBackground: Palette
//   headerColorBackground1: Palette
//   footerColorBackground: Palette
//   footerColorBackground1: Palette
//   navColorBakground: Palette
//   appMaxWidth: string
//   appPadding: string
// }
