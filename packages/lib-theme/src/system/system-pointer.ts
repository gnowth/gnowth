import { systemBuild, systemCompose } from './system'

export const systemCursor = systemBuild<{ cursor?: string }>({ key: 'cursor' })
export const systemPointerEvents = systemBuild<{ pointerEvents?: string }>({ key: 'pointerEvents' })

export const systemPointer = () => systemCompose(systemCursor(), systemPointerEvents())
