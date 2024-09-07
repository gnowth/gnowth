import type { CSSObject } from '@emotion/serialize'

import * as R from 'remeda'

import type { TokenFontSize } from '../tokens/tokens'
import type { System } from './system.types'

import { TokenFont, TokenFontToVariable } from '../tokens/wip-token-font'
import { systemBuild, systemCompose } from './system'

type SystemFontFamily = { fontFamily?: number | string }
type SystemFontStyle = { fontStyle?: string }
type SystemFontWeight = { fontWeight?: number | string }
type SystemLetterSpacing = { letterSpacing?: string }
type SystemLineHeight = { lineHeight?: string }
type SystemTextAlign = { textAlign?: string }
type SystemTextDecoration = { textDecoration?: string }
type SystemTextTransform = { textTransform?: string }
type SystemWhiteSpace = { whiteSpace?: string }

export const systemFontFamily: () => System<SystemFontFamily> = () => (props, theme) => {
  if (R.isString(props.fontFamily)) {
    return { fontFamily: props.fontFamily }
  }

  if (props.fontFamily === undefined) {
    return {}
  }

  const tokenVariable = TokenFontToVariable[props.fontFamily as TokenFont]
  const fontFamily = theme.getVariable<string | string[]>(tokenVariable)

  return fontFamily ? { fontFamily } : {}
}

export const systemFontSize = systemBuild<{ fontSize?: TokenFontSize | string }>({
  key: 'fontSize',
  scale: 'fontsize',
})

export const systemFontStyle: () => System<SystemFontStyle> = () => (props) => ({
  fontStyle: props.fontStyle,
})

// TODO fix type
export const systemFontWeight: () => System<SystemFontWeight> = () => (props) =>
  ({
    fontWeight: props.fontWeight,
  }) as unknown as CSSObject

export const systemLetterSpacing: () => System<SystemLetterSpacing> = () => (props) => ({
  letterSpacing: props.letterSpacing,
})

export const systemLineHeight: () => System<SystemLineHeight> = () => (props) => ({
  lineHeight: props.lineHeight,
})

// TODO: fix type
export const systemTextAlign: () => System<SystemTextAlign> = () => (props) =>
  ({ textAlign: props.textAlign }) as unknown as CSSObject

export const systemTextDecoration: () => System<SystemTextDecoration> = () => (props) =>
  ({ textDecoration: props.textDecoration }) as unknown as CSSObject

export const systemTextTransform: () => System<SystemTextTransform> = () => (props) =>
  ({ textTransform: props.textTransform }) as unknown as CSSObject

export const systemWhiteSpace: () => System<SystemWhiteSpace> = () => (props) =>
  ({ whiteSpace: props.whiteSpace }) as unknown as CSSObject

export const systemTypography = () =>
  systemCompose(
    systemFontFamily(),
    systemFontSize(),
    systemFontStyle(),
    systemFontWeight(),
    systemLetterSpacing(),
    systemLineHeight(),
    systemTextAlign(),
    systemTextDecoration(),
    systemTextTransform(),
    systemWhiteSpace(),
  )
