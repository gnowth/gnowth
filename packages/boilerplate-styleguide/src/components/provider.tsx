import { AppEnvironment } from '@gnowth/lib-react'
import { FunctionComponent, PropsWithChildren } from 'react'

import { theme } from '../modules/theme'

export const Provider: FunctionComponent<PropsWithChildren> = (props) => {
  return <AppEnvironment theme={theme}>{props.children}</AppEnvironment>
}
