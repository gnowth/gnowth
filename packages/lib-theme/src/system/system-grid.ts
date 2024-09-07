import type { ScaleName, ScaleType } from '../theme/scales'
import type { TokenPropertyValue, TokenSpace } from '../tokens/tokens'
import type { SystemUnits } from './system.types'

import { systemBuild, systemCompose } from './system'

type CSSGap = SystemUnits | TokenPropertyValue | TokenSpace
export const systemColumnGap = systemBuild<{ columnGap?: CSSGap }>({ key: 'columnGap', scale: 'space' })
export const systemGap = systemBuild<{ gap?: CSSGap }>({ key: 'gap', scale: 'space' })
export const systemRowGap = systemBuild<{ rowGap?: CSSGap }>({ key: 'rowGap', scale: 'space' })
export const systemAlignContent = systemBuild<{ alignContent?: string }>({ key: 'alignContent' })
export const systemAlignItems = systemBuild<{ alignItems?: string }>({ key: 'alignItems' })
export const systemAlignSelf = systemBuild<{ alignSelf?: string }>({ key: 'alignSelf' })
export const systemFlex = systemBuild<{ flex?: string }>({ key: 'flex' })
export const systemFlexBasis = systemBuild<{ flexBasis?: string }>({ key: 'flexBasis' })
export const systemFlexDirection = systemBuild<{ flexDirection?: string }>({ key: 'flexDirection' })
export const systemFlexGrow = systemBuild<{ flexGrow?: string }>({ key: 'flexGrow' })
export const systemFlexShrink = systemBuild<{ flexShrink?: string }>({ key: 'flexShrink' })
export const systemFlexWrap = systemBuild<{ flexWrap?: string }>({ key: 'flexWrap' })
export const systemJustifyContent = systemBuild<{ justifyContent?: string }>({ key: 'justifyContent' })
export const systemJustifyItems = systemBuild<{ justifyItems?: string }>({ key: 'justifyItems' })
export const systemJustifySelf = systemBuild<{ justifySelf?: string }>({ key: 'justifySelf' })
export const systemOrder = systemBuild<{ order?: string }>({ key: 'order' })

export const systemGrid = (scale?: ScaleName | ScaleType) =>
  systemCompose(
    systemAlignContent(),
    systemAlignItems(),
    systemAlignSelf(),
    systemFlex(),
    systemFlexBasis(),
    systemFlexDirection(),
    systemFlexGrow(),
    systemFlexShrink(),
    systemFlexWrap(),
    systemGap({ scale }),
    systemColumnGap({ scale }),
    systemRowGap({ scale }),
    systemJustifyContent(),
    systemJustifyItems(),
    systemJustifySelf(),
    systemOrder(),
  )
