import { Theme } from '@gnowth/lib-theme'
import { FunctionComponent, ReactNode } from 'react'

import { AppProvider } from './app-provider'

type Props = {
  children: ReactNode
  theme?: string | Theme
}

export const AppTheme: FunctionComponent<Props> = (props) => (
  <AppProvider theme={props.theme}>{props.children}</AppProvider>
)
