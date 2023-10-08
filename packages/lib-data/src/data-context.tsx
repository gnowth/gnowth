import type { PropsData } from '@gnowth/lib-types'
import { createContext } from 'react'

import type { WithConnect } from './types'

export const DataContext = createContext<PropsData & WithConnect>({ connect: () => ({}) })
