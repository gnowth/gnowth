import { FunctionComponent, PropsWithChildren } from 'react'

import { ApplicationDocsFrame } from './application-docs.frame'
import { ApplicationDocsProvider } from './application-docs.provider'

export const ApplicationDocsLayout: FunctionComponent<PropsWithChildren> = (props) => (
  <ApplicationDocsProvider>
    <ApplicationDocsFrame>{props.children}</ApplicationDocsFrame>
  </ApplicationDocsProvider>
)
