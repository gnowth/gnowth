import { FunctionComponent, PropsWithChildren } from 'react'

import { ApplicationPagesFrame } from './application-pages.frame'
import { ApplicationPagesProvider } from './application-pages.provider'

export const ApplicationPagesLayout: FunctionComponent<PropsWithChildren> = (props) => (
  <ApplicationPagesProvider>
    <ApplicationPagesFrame>{props.children}</ApplicationPagesFrame>
  </ApplicationPagesProvider>
)
