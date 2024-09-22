import { AppProvider } from '@gnowth/lib-react'
import { FunctionComponent, PropsWithChildren } from 'react'

import { theme } from '../modules/theme'

export const ApplicationDocsProvider: FunctionComponent<PropsWithChildren> = (props) => {
  return <AppProvider theme={theme}>{props.children}</AppProvider>
}
