import { FunctionComponent, PropsWithChildren } from 'react'

import { ApplicationRootWrapper } from './application-root.wrapper'

export const ApplicationRootLayout: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <html lang="en">
      <body>
        <ApplicationRootWrapper>{props.children}</ApplicationRootWrapper>
      </body>
    </html>
  )
}
