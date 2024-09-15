import { Fragment, ReactElement, ReactNode, useContext } from 'react'
import * as R from 'remeda'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'

interface Props {
  children: ReactNode
}

export function AppFrame(props: Props): ReactElement {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)

  if (!contextApplication.frame) return <>{props.children}</>

  const FrameComponent = R.isString(contextApplication.frame)
    ? contextEnvironment.frames[contextApplication.frame] || Fragment
    : contextApplication.frame

  return <FrameComponent>{props.children}</FrameComponent>
}
