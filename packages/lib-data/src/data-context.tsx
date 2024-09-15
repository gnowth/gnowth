import { createContext } from 'react'

import { PropsData, WithConnect } from './types'

export const DataContext = createContext<PropsData & WithConnect>({ connect: () => ({}) })
