type ColorWeight = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export type Token = {
  color?: {
    primary?: string
    secondary?: string
    tertiary?: string
  }
  breakpoint?: {
    xxs?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    xxl?: string
    xxxl?: string
  }
  fontSize?: {
    x10?: string
    x25?: string
    x50?: string
    x75?: string
    x100?: string
    x200?: string
    x300?: string
    x400?: string
    x500?: string
    x600?: string
    x700?: string
    x800?: string
    x900?: string
    x1000?: string
    x1100?: string
    x1200?: string
    x1300?: string
  }
  fontSizeDesktop?: {
    x10?: string
    x25?: string
    x50?: string
    x75?: string
    x100?: string
    x200?: string
    x300?: string
    x400?: string
    x500?: string
    x600?: string
    x700?: string
    x800?: string
    x900?: string
    x1000?: string
    x1100?: string
    x1200?: string
    x1300?: string
  }
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
        ColorWeight,
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

type Palette = {
  name: string
  weight?: string
}

export type Theme = {
  appColorForeground: Palette
  appColorBackground: Palette
  headerColorBackground: Palette
  headerColorBackground1: Palette
  footerColorBackground: Palette
  footerColorBackground1: Palette
  navColorBakground: Palette
  appMaxWidth: string
  appPadding: string
}
