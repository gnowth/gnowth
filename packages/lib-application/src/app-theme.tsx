import { Theme } from '@gnowth/lib-theme'
import { FunctionComponent, ReactNode } from 'react'

import { AppProvider } from './app-provider'

type Props = {
  children: ReactNode
  theme?: Theme | string
}

export const AppTheme: FunctionComponent<Props> = (props) => (
  <AppProvider theme={props.theme}>{props.children}</AppProvider>
)
