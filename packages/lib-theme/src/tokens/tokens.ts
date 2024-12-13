export * from './wip-token-variable'

export type TokenBase = string
export type TokenBreakpoint = 'lg' | 'md' | 'none' | 'sm' | 'xl' | 'xs' | 'xxl' | 'xxs'
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
export type TokenFontFamily = 'body' | 'header'
export type TokenFontSize =
  | 'x10'
  | 'x25'
  | 'x50'
  | 'x75'
  | 'x100'
  | 'x200'
  | 'x300'
  | 'x400'
  | 'x500'
  | 'x600'
  | 'x700'
  | 'x800'
  | 'x900'
  | 'x1000'
  | 'x1100'
  | 'x1200'
  | 'x1300'
export type TokenLength =
  | 'full'
  | 'half'
  | 'lg'
  | 'md'
  | 'none'
  | 'quarter'
  | 'sm'
  | 'tenth'
  | 'third'
  | 'xl'
  | 'xs'
  | 'xxl'
  | 'xxs'
  | 'xxxl'

export type TokenMedia = 'print' | 'screen'

export type TokenPalette =
  | 'background'
  | 'danger'
  | 'foreground'
  | 'gray'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'transparent'

export type TokenPropertyValue = 'auto' | 'inherit' | 'initial'

export type Tokens = {
  breakpoint?: Record<TokenBreakpoint, string | undefined>
  buttonSize?: Record<TokenSize, string | undefined>
  color?: Record<TokenPalette, string | undefined>
  fontSize?: Record<TokenFontSize, string | undefined>
  iconSize?: Record<TokenSize, string | undefined>
  palette: Record<
    TokenPalette,
    {
      colors: Record<TokenColorWeight, { hex: string; name: string }>
      name: string
    }
  >
  space?: Record<TokenSize, string | undefined>
  zIndex?: Record<TokenZIndex, string | undefined>
}

export type TokenSize = 'lg' | 'md' | 'none' | 'sm' | 'xl' | 'xs' | 'xxl' | 'xxs' | 'xxxl'

export type TokenZIndex =
  | 'deepdive'
  | 'default'
  | 'dialog'
  | 'docked'
  | 'dropdown'
  | 'frame'
  | 'modal'
  | 'overlay'
  | 'popup'
  | 'reminder'
  | 'spinner'
  | 'sticky'
  | 'toast'
