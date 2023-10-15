import type { VariantType } from '@gnowth/lib-theme'
import type { VariantUITypography } from '@gnowth/lib-view'
import { TokenFont } from '@gnowth/lib-token'

// TODO: add variant link
export const body1: VariantType<VariantUITypography> = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: 'x100',
  fontWeight: 400,
  letterSpacing: '0.5px',
}

export const body2: VariantType<VariantUITypography> = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: 'x75',
  fontWeight: 400,
  letterSpacing: '0.25px',
}

export const button: VariantType<VariantUITypography> = {
  fontFamily: TokenFont.body,
  fontSize: 'x75',
  fontWeight: 500,
  letterSpacing: '1.25px',
  textTransform: 'uppercase',
}

export const caption: VariantType<VariantUITypography> = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: 'x50',
  fontWeight: 400,
  letterSpacing: '0.4px',
}

export const code: VariantType<VariantUITypography> = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: 'x50',
  fontWeight: 400,
  letterSpacing: '0.4px',
}

export const h1: VariantType<VariantUITypography> = {
  as: 'h1',
  fontFamily: TokenFont.header,
  fontSize: 'x1200',
  fontWeight: 300,
  letterSpacing: '-1.5px',
}

export const h2: VariantType<VariantUITypography> = {
  as: 'h2',
  fontFamily: TokenFont.header,
  fontSize: 'x1000',
  fontWeight: 300,
  letterSpacing: '-0.5px',
}

export const h3: VariantType<VariantUITypography> = {
  as: 'h3',
  fontFamily: TokenFont.header,
  fontSize: 'x800',
  fontWeight: 400,
  letterSpacing: '0',
}

export const h4: VariantType<VariantUITypography> = {
  as: 'h4',
  fontFamily: TokenFont.header,
  fontSize: 'x600',
  fontWeight: 400,
  letterSpacing: '0.25px',
}

export const h5: VariantType<VariantUITypography> = {
  as: 'h5',
  fontFamily: TokenFont.header,
  fontSize: 'x400',
  fontWeight: 400,
  letterSpacing: '0',
}

export const h6: VariantType<VariantUITypography> = {
  as: 'h6',
  fontFamily: TokenFont.header,
  fontSize: 'x200',
  fontWeight: 500,
  letterSpacing: '0.15px',
}

export const input: VariantType<VariantUITypography> = {
  fontFamily: TokenFont.body,
  fontSize: 'x75',
  fontWeight: 400,
  letterSpacing: '0.25px',
}

export const label: VariantType<VariantUITypography> = {
  as: 'label',
  fontFamily: TokenFont.body,
  fontSize: 'x75',
  fontWeight: 400,
  letterSpacing: '0.25px',
}

export const link: VariantType<VariantUITypography> = {
  as: 'span',
  fontFamily: TokenFont.body,
  fontSize: 'x75',
  fontWeight: 400,
  letterSpacing: '1.5px',
  textDecoration: 'underline',
}

export const overline: VariantType<VariantUITypography> = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: 'x25',
  fontWeight: 400,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
}

export const subtitle1: VariantType<VariantUITypography> = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: 'x100',
  fontWeight: 400,
  letterSpacing: '0.15px',
}

export const subtitle2: VariantType<VariantUITypography> = {
  as: 'p',
  fontFamily: TokenFont.body,
  fontSize: 'x75',
  fontWeight: 500,
  letterSpacing: '0.1px',
}
