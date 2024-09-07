import type { CSSLength } from './system.types'

import { systemCompose, systemMake } from './system'

export const systemDisplay = systemMake<{ display: string }>({ key: 'display' })
const systemHeight = systemMake<{ height: string }>({ key: 'height' })
const systemMaxHeight = systemMake<{ maxHeight: string }>({ key: 'maxHeight' })
const systemMaxWidth = systemMake<{ maxWidth: string }>({ key: 'maxWidth' })
const systemMinHeight = systemMake<{ minHeight: string }>({ key: 'minHeight' })
const systemMinWidth = systemMake<{ minWidth: string }>({ key: 'minWidth' })
const systemOverflow = systemMake<{ overflow: string }>({ key: 'overflow' })
const systemOverflowX = systemMake<{ overflowX: string }>({ key: 'overflowX' })
const systemOverflowY = systemMake<{ overflowY: string }>({ key: 'overflowY' })
const systemWidth = systemMake<{ width: CSSLength }>({ key: 'width', scale: 'length' })

export const systemLayout = () =>
  systemCompose(
    systemDisplay(),
    systemHeight(),
    systemMaxHeight(),
    systemMaxWidth(),
    systemMinHeight(),
    systemMinWidth(),
    systemOverflow(),
    systemOverflowX(),
    systemOverflowY(),
    systemWidth(),
  )
