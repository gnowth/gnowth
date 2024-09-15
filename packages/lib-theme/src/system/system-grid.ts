import { systemCompose, systemMake } from './system'
import { CSSSpace } from './system.types'

const systemColumnGap = systemMake<{ columnGap: CSSSpace }>({ key: 'columnGap', scale: 'space' })
export const systemGap = systemMake<{ gap: CSSSpace }>({ key: 'gap', scale: 'space' })
const systemRowGap = systemMake<{ rowGap: CSSSpace }>({ key: 'rowGap', scale: 'space' })
const systemAlignContent = systemMake<{ alignContent: string }>({ key: 'alignContent' })
const systemAlignItems = systemMake<{ alignItems: string }>({ key: 'alignItems' })
const systemAlignSelf = systemMake<{ alignSelf: string }>({ key: 'alignSelf' })
const systemFlex = systemMake<{ flex: string }>({ key: 'flex' })
const systemFlexBasis = systemMake<{ flexBasis: string }>({ key: 'flexBasis' })
const systemFlexDirection = systemMake<{ flexDirection: string }>({ key: 'flexDirection' })
const systemFlexGrow = systemMake<{ flexGrow: string }>({ key: 'flexGrow' })
const systemFlexShrink = systemMake<{ flexShrink: string }>({ key: 'flexShrink' })
const systemFlexWrap = systemMake<{ flexWrap: string }>({ key: 'flexWrap' })
const systemGridTemplateColumns = systemMake<{ gridTemplateColumns: string }>({ key: 'gridTemplateColumns' })
const systemJustifyContent = systemMake<{ justifyContent: string }>({ key: 'justifyContent' })
const systemJustifyItems = systemMake<{ justifyItems: string }>({ key: 'justifyItems' })
const systemJustifySelf = systemMake<{ justifySelf: string }>({ key: 'justifySelf' })
const systemOrder = systemMake<{ order: string }>({ key: 'order' })

export const systemGrid = () =>
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
    systemGap(),
    systemGridTemplateColumns(),
    systemColumnGap(),
    systemRowGap(),
    systemJustifyContent(),
    systemJustifyItems(),
    systemJustifySelf(),
    systemOrder(),
  )
