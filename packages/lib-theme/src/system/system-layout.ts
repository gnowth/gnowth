import type { CSSLength } from './system.types'

import { systemBuild, systemCompose } from './system'

export const systemDisplay = systemBuild<{ display?: string }>({ key: 'display' })
export const systemHeight = systemBuild<{ height?: string }>({ key: 'height' })
export const systemMaxHeight = systemBuild<{ maxHeight?: string }>({ key: 'maxHeight' })
export const systemMaxWidth = systemBuild<{ maxWidth?: string }>({ key: 'maxWidth' })
export const systemMinHeight = systemBuild<{ minHeight?: string }>({ key: 'minHeight' })
export const systemMinWidth = systemBuild<{ minWidth?: string }>({ key: 'minWidth' })
export const systemOverflow = systemBuild<{ overflow?: string }>({ key: 'overflow' })
export const systemOverflowX = systemBuild<{ overflowX?: string }>({ key: 'overflowX' })
export const systemOverflowY = systemBuild<{ overflowY?: string }>({ key: 'overflowY' })
export const systemWidth = systemBuild<{ width?: CSSLength }>({ key: 'width', scale: 'length' })

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
