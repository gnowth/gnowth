import { TokenZIndex } from '../tokens/tokens'
import { systemCompose, systemMake } from './system'

const systemBottom = systemMake<{ bottom: string }>({ key: 'bottom' })
const systemLeft = systemMake<{ left: string }>({ key: 'left' })
const systemPosition = systemMake<{ position: string }>({ key: 'position' })
const systemRight = systemMake<{ right: string }>({ key: 'right' })
const systemTop = systemMake<{ top: string }>({ key: 'top' })
const systemZIndex = systemMake<{ zIndex: string | TokenZIndex }>({ key: 'zIndex', scale: 'zIndex' })

export const systemPlace = () =>
  systemCompose(systemBottom(), systemLeft(), systemPosition(), systemRight(), systemTop(), systemZIndex())
