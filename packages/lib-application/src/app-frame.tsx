import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { guardString } from '@gnowth/lib-utils'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'

interface Props {
  children: ReactNode
}

export function AppFrame(props: Props): ReactElement {
  const contextApplication = React.useContext(ContextApplication)
  const contextEnvironment = React.useContext(ContextEnvironment)

  if (!contextApplication.frame) return <>{props.children}</>

  const FrameComponent = guardString(contextApplication.frame)
    ? contextEnvironment.frames[contextApplication.frame] || React.Fragment
    : contextApplication.frame

  return <FrameComponent>{props.children}</FrameComponent>
}
