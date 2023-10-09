import type { ComponentType, ErrorInfo, FunctionComponent, ReactNode } from 'react'
import { UtilError } from '@gnowth/lib-utils'
import { ErrorBoundary } from 'react-error-boundary'

import type { PropsBoundary } from './types'
import { useAppBoundary } from './use-app-boundary'

interface Props {
  boundary?: ComponentType<PropsBoundary> | string | null
  boundaryClassName?: string
  children: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export const AppBoundary: FunctionComponent<Props> = (props) => {
  const BoundaryMaybe = useAppBoundary(props.boundary)

  if (BoundaryMaybe === undefined) {
    // TODO: must have a fallback but must log the error
    throw new UtilError({
      message: 'Default error component has not been set',
      method: 'AppBoundary',
      package: '@gnowth/lib-application',
      type: 'internal',
    })
  }

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        if (BoundaryMaybe === null) {
          throw error
        }

        return (
          <BoundaryMaybe
            className={props.boundaryClassName}
            resetErrorBoundary={resetErrorBoundary}
            value={error}
          />
        )
      }}
      onError={props.onError}
    >
      {props.children}
    </ErrorBoundary>
  )
}
