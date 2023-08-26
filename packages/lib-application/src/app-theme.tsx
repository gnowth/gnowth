import type { FunctionComponent, ReactNode } from 'react'
import type { Theme } from '@gnowth/lib-types'
import React from 'react'

import AppProvider from './app-provider'

interface Props {
  children: ReactNode
  theme?: Theme | string
}

const AppTheme: FunctionComponent<Props> = (props) => (
  <AppProvider theme={props.theme}>{props.children}</AppProvider>
)

export default AppTheme
