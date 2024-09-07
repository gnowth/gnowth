import { systemCompose, systemMake } from './system'

const systemCursor = systemMake<{ cursor: string }>({ key: 'cursor' })
const systemPointerEvents = systemMake<{ pointerEvents: string }>({ key: 'pointerEvents' })

export const systemPointer = () => systemCompose(systemCursor(), systemPointerEvents())
