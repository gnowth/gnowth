export type TokenColorWeight =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'a100'
  | 'a200'
  | 'a400'
  | 'a700'

export type TokenBreakpoint = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type TokenPalette =
  | 'background'
  | 'danger'
  | 'foreground'
  | 'gray'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'transparent'

export type TokenFontSize =
  | 'x0010'
  | 'x0025'
  | 'x0050'
  | 'x0075'
  | 'x0100'
  | 'x0200'
  | 'x0300'
  | 'x0400'
  | 'x0500'
  | 'x0600'
  | 'x0700'
  | 'x0800'
  | 'x0900'
  | 'x1000'
  | 'x1100'
  | 'x1200'
  | 'x1300'

export type TokenIconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
export type TokenSpace = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export type TokenTypography = 'text' | 'header'
export type TokenMedia = 'screen' | 'print'
export type TokenZIndex =
  | 'deepdive'
  | 'default'
  | 'docked'
  | 'frame'
  | 'sticky'
  | 'popup'
  | 'dialog'
  | 'dropdown'
  | 'overlay'
  | 'reminder'
  | 'modal'
  | 'spinner'
  | 'toast'

export type TokenLength = 'full' | 'half' | 'quarter' | 'tenth'

type TokenUnitsAbsolute =
  | `${number}cm`
  | `${number}mm`
  | `${number}in`
  | `${number}px`
  | `${number}pt`
  | `${number}pc`
type TokenUnitsRelative =
  | `${number}em`
  | `${number}ex`
  | `${number}ch`
  | `${number}rem`
  | `${number}vw`
  | `${number}vh`
  | `${number}vmin`
  | `${number}vmax`
  | `${number}%`
export type TokenUnits = TokenUnitsAbsolute | TokenUnitsRelative

export type Tokens = {
  color?: {
    primary?: string
    secondary?: string
    tertiary?: string
  }
  breakpoint?: Record<TokenBreakpoint, string | undefined>
  fontSize?: Record<TokenFontSize, string | undefined>
  fontSizeDesktop?: Record<TokenFontSize, string | undefined>
  iconSize?: {
    xxs?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    xxl?: string
    xxxl?: string
  }
  palette: Record<
    string,
    {
      name: string
      colors: Record<
        TokenColorWeight,
        {
          hex: string
          name: string
        }
      >
    }
  >
  space?: {
    xxs?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    xxl?: string
    xxxl?: string
  }
  zIndex?: {
    deepdive: string
    default: string
    docked: string
    frame: string
    sticky: string
    popup: string
    dialog: string
    dropdown: string
    overlay: string
    reminder: string
    modal: string
    spinner: string
    toast: string
  }
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
