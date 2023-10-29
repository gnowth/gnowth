import type { ComponentType, FunctionComponent, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

type PropsFallback = {
  error: Error
  reset: () => void
}

type Props = {
  FallbackComponent?: ComponentType<PropsFallback> | null
  children: ReactNode
}

// DEBT: to simplify fallbackRender
export const SystemBoundaryDeprecated: FunctionComponent<Props> = (props) => {
  if (!props.FallbackComponent) {
    return <>{props.children}</>
  }

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) =>
        props.FallbackComponent ? (
          <props.FallbackComponent error={error} reset={resetErrorBoundary} />
        ) : (
          <>{props.children}</>
        )
      }
    >
      {props.children}
    </ErrorBoundary>
  )
}
