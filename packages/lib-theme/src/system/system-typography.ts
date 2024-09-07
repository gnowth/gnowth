import * as R from 'remeda'

import type { TokenFontSize } from '../tokens/tokens'
import type { System } from './system.types'

import { TokenFont, TokenFontToVariable } from '../tokens/wip-token-font'
import { systemCompose, systemMake } from './system'

type SystemFontFamily = { fontFamily?: number | string }

const systemFontFamily: () => System<SystemFontFamily> = () => (props, theme) => {
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

const systemFontSize = systemMake<{ fontSize: TokenFontSize | string }>({
  key: 'fontSize',
  scale: 'fontsize',
})
const systemFontStyle = systemMake<{ fontStyle: string }>({ key: 'fontStyle' })
const systemFontWeight = systemMake<{ fontWeight: string }>({ key: 'fontWeight' })
const systemLetterSpacing = systemMake<{ letterSpacing: string }>({ key: 'letterSpacing' })
const systemLineHeight = systemMake<{ lineHeight: string }>({ key: 'lineHeight' })
export const systemTextAlign = systemMake<{ textAlign: string }>({ key: 'textAlign' })
const systemTextDecoration = systemMake<{ textDecoration: string }>({ key: 'textDecoration' })
const systemTextTransform = systemMake<{ textTransform: string }>({ key: 'textTransform' })
const systemWhiteSpace = systemMake<{ whiteSpace: string }>({ key: 'whiteSpace' })

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
