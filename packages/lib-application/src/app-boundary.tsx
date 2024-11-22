import { ErrorCustom } from '@gnowth/lib-utils'
import { ComponentType, ErrorInfo, FunctionComponent, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { PropsBoundary } from './types'
import { useAppBoundary } from './use-app-boundary'

type Props = {
  boundary?: ComponentType<PropsBoundary> | null | string
  boundaryClassName?: string
  children: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

// DEBT(feature): display boundary based on type of error
export const AppBoundary: FunctionComponent<Props> = (props) => {
  const BoundaryMaybe = useAppBoundary(props.boundary)

  if (BoundaryMaybe === undefined) {
    // TODO: must have a fallback but must log the error
    throw new ErrorCustom({
      code: 'lib-application--app-boundary--01',
      message: 'Default error component has not been set',
      trace: {
        caller: 'AppBoundary',
        context: 'AppBoundary',
        source: 'lib-application',
      },
    })
  }

  return (
    <ErrorBoundary
      // eslint-disable-next-line sonarjs/no-unstable-nested-components
      fallbackRender={({ error, resetErrorBoundary }) => {
        if (BoundaryMaybe === null) {
          throw error
        }

        // TODO: get boundary based on error type
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
