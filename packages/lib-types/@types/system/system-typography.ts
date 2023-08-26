export interface SystemFontFamily {
  fontFamily?: string | number
}

export interface SystemFontSize {
  fontSize?: string | number
}

export interface SystemFontStyle {
  fontStyle?: string
}

export interface SystemFontWeight {
  fontWeight?: string | number
}

export interface SystemLetterSpacing {
  letterSpacing?: string
}

export interface SystemLineHeight {
  lineHeight?: string
}

export interface SystemTextAlign {
  textAlign?: string
}

export interface SystemTextDecoration {
  textDecoration?: string
}

export interface SystemTextTransform {
  textTransform?: string
}

export interface SystemTypography
  extends SystemFontFamily,
    SystemFontSize,
    SystemFontStyle,
    SystemFontWeight,
    SystemLetterSpacing,
    SystemLineHeight,
    SystemTextAlign,
    SystemTextDecoration,
    SystemTextTransform {}
