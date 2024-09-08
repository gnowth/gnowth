import type { TokenFontFamily, TokenFontSize } from '../tokens/tokens'

import { systemCompose, systemMake } from './system'

const systemFontFamily = systemMake<{ fontFamily: TokenFontFamily }>({
  key: 'fontFamily',
  scale: 'fontFamily',
})
const systemFontSize = systemMake<{ fontSize: TokenFontSize }>({ key: 'fontSize', scale: 'fontSize' })
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
