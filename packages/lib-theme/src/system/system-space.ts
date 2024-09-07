import type { ScaleName, ScaleType } from '../theme/scales'
import type { CSSSpace } from './system.types'

import { systemBuild, systemCompose } from './system'

export const systemMargin = systemBuild<{ margin?: CSSSpace }>({ key: 'margin', scale: 'space' })
export const systemMarginBottom = systemBuild<{ marginBottom?: CSSSpace }>({
  key: 'marginBottom',
  scale: 'space',
})
export const systemMarginLeft = systemBuild<{ marginLeft?: CSSSpace }>({ key: 'marginLeft', scale: 'space' })
export const systemMarginRight = systemBuild<{ marginRight?: CSSSpace }>({
  key: 'marginRight',
  scale: 'space',
})
export const systemMarginTop = systemBuild<{ marginTop?: CSSSpace }>({ key: 'marginTop', scale: 'space' })
export const systemPadding = systemBuild<{ padding?: CSSSpace }>({ key: 'padding', scale: 'space' })
export const systemPaddingBottom = systemBuild<{ paddingBottom?: CSSSpace }>({
  key: 'paddingBottom',
  scale: 'space',
})
export const systemPaddingLeft = systemBuild<{ paddingLeft?: CSSSpace }>({
  key: 'paddingLeft',
  scale: 'space',
})
export const systemPaddingRight = systemBuild<{ paddingRight?: CSSSpace }>({
  key: 'paddingRight',
  scale: 'space',
})
export const systemPaddingTop = systemBuild<{ paddingTop?: CSSSpace }>({ key: 'paddingTop', scale: 'space' })

export const systemSpace = (scale?: ScaleName | ScaleType) =>
  systemCompose(
    systemMargin({ scale }),
    systemMarginBottom({ scale }),
    systemMarginLeft({ scale }),
    systemMarginRight({ scale }),
    systemMarginTop({ scale }),
    systemPadding({ scale }),
    systemPaddingBottom({ scale }),
    systemPaddingLeft({ scale }),
    systemPaddingRight({ scale }),
    systemPaddingTop({ scale }),
  )
