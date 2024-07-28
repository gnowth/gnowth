import type { Theme } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'

import { AppProvider } from './app-provider'

interface Props {
  children: ReactNode
  theme?: Theme | string
}

export const AppTheme: FunctionComponent<Props> = (props) => (
  <AppProvider theme={props.theme}>{props.children}</AppProvider>
)
