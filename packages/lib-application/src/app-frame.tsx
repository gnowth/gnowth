import { Fragment, FunctionComponent, ReactNode, useContext } from 'react'
import * as R from 'remeda'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'

type Props = { children: ReactNode }
export const AppFrame: FunctionComponent<Props> = (props) => {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)

  if (!contextApplication.frame) return <>{props.children}</>

  const FrameComponent = R.isString(contextApplication.frame)
    ? contextEnvironment.frames[contextApplication.frame] || Fragment
    : contextApplication.frame

  return <FrameComponent>{props.children}</FrameComponent>
}
