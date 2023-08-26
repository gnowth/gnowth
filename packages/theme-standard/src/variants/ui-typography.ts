import type { VariantUITypography } from '@gnowth/lib-view'
import { TokenFont, TokenFontSize } from '@gnowth/lib-token'

// TODO: add variant link
export const body1: VariantUITypography = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x100,
  fontWeight: 400,
  letterSpacing: '0.5px',
}

export const body2: VariantUITypography = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x75,
  fontWeight: 400,
  letterSpacing: '0.25px',
}

export const button: VariantUITypography = {
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x75,
  fontWeight: 500,
  letterSpacing: '1.25px',
  textTransform: 'uppercase',
}

export const caption: VariantUITypography = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x50,
  fontWeight: 400,
  letterSpacing: '0.4px',
}

export const code: VariantUITypography = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x50,
  fontWeight: 400,
  letterSpacing: '0.4px',
}

export const h1: VariantUITypography = {
  as: 'h1',
  fontFamily: TokenFont.header,
  fontSize: TokenFontSize.x1200,
  fontWeight: 300,
  letterSpacing: '-1.5px',
}

export const h2: VariantUITypography = {
  as: 'h2',
  fontFamily: TokenFont.header,
  fontSize: TokenFontSize.x1000,
  fontWeight: 300,
  letterSpacing: '-0.5px',
}

export const h3: VariantUITypography = {
  as: 'h3',
  fontFamily: TokenFont.header,
  fontSize: TokenFontSize.x800,
  fontWeight: 400,
  letterSpacing: '0',
}

export const h4: VariantUITypography = {
  as: 'h4',
  fontFamily: TokenFont.header,
  fontSize: TokenFontSize.x600,
  fontWeight: 400,
  letterSpacing: '0.25px',
}

export const h5: VariantUITypography = {
  as: 'h5',
  fontFamily: TokenFont.header,
  fontSize: TokenFontSize.x400,
  fontWeight: 400,
  letterSpacing: '0',
}

export const h6: VariantUITypography = {
  as: 'h6',
  fontFamily: TokenFont.header,
  fontSize: TokenFontSize.x200,
  fontWeight: 500,
  letterSpacing: '0.15px',
}

export const input: VariantUITypography = {
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x75,
  fontWeight: 400,
  letterSpacing: '0.25px',
}

export const label: VariantUITypography = {
  as: 'label',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x75,
  fontWeight: 400,
  letterSpacing: '0.25px',
}

export const link: VariantUITypography = {
  as: 'span',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x75,
  fontWeight: 400,
  letterSpacing: '1.5px',
  textDecoration: 'underline',
}

export const overline: VariantUITypography = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x25,
  fontWeight: 400,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
}

export const subtitle1: VariantUITypography = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x100,
  fontWeight: 400,
  letterSpacing: '0.15px',
}

export const subtitle2: VariantUITypography = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: TokenFontSize.x75,
  fontWeight: 500,
  letterSpacing: '0.1px',
}
