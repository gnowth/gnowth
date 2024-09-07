import type { TokenZIndex } from '../tokens/tokens'

import { systemBuild, systemCompose } from './system'

export const systemBottom = systemBuild<{ bottom?: string }>({ key: 'bottom' })
export const systemLeft = systemBuild<{ left?: string }>({ key: 'left' })
export const systemPosition = systemBuild<{ position?: string }>({ key: 'position' })
export const systemRight = systemBuild<{ right?: string }>({ key: 'right' })
export const systemTop = systemBuild<{ top?: string }>({ key: 'top' })
export const systemZIndex = systemBuild<{ zIndex?: TokenZIndex | string }>({ key: 'zIndex', scale: 'zindex' })

export const systemPlace = () =>
  systemCompose(systemBottom(), systemLeft(), systemPosition(), systemRight(), systemTop(), systemZIndex())
