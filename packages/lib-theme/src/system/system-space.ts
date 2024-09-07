import type { CSSSpace } from './system.types'

import { systemCompose, systemMake } from './system'

const systemMargin = systemMake<{ margin: CSSSpace }>({ key: 'margin', scale: 'space' })
const systemMarginBottom = systemMake<{ marginBottom: CSSSpace }>({ key: 'marginBottom', scale: 'space' })
const systemMarginLeft = systemMake<{ marginLeft: CSSSpace }>({ key: 'marginLeft', scale: 'space' })
const systemMarginRight = systemMake<{ marginRight: CSSSpace }>({ key: 'marginRight', scale: 'space' })
const systemMarginTop = systemMake<{ marginTop: CSSSpace }>({ key: 'marginTop', scale: 'space' })
const systemPadding = systemMake<{ padding: CSSSpace }>({ key: 'padding', scale: 'space' })
const systemPaddingBottom = systemMake<{ paddingBottom: CSSSpace }>({ key: 'paddingBottom', scale: 'space' })
const systemPaddingLeft = systemMake<{ paddingLeft: CSSSpace }>({ key: 'paddingLeft', scale: 'space' })
const systemPaddingRight = systemMake<{ paddingRight: CSSSpace }>({ key: 'paddingRight', scale: 'space' })
const systemPaddingTop = systemMake<{ paddingTop: CSSSpace }>({ key: 'paddingTop', scale: 'space' })

export const systemSpace = () =>
  systemCompose(
    systemMargin(),
    systemMarginBottom(),
    systemMarginLeft(),
    systemMarginRight(),
    systemMarginTop(),
    systemPadding(),
    systemPaddingBottom(),
    systemPaddingLeft(),
    systemPaddingRight(),
    systemPaddingTop(),
  )
