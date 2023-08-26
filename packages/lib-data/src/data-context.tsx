import type { PropsData } from '@gnowth/lib-types'
import React from 'react'

import type { WithConnect } from './types'

const DataContext = React.createContext<PropsData & WithConnect>({ connect: () => ({}) })

export default DataContext
