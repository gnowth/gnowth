import { createContext } from 'react'

import type { PropsData, WithConnect } from './types'

export const DataContext = createContext<PropsData & WithConnect>({ connect: () => ({}) })
