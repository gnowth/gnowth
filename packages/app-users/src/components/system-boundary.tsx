import { ComponentType, FunctionComponent, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

type Props = {
  children: ReactNode
  FallbackComponent?: ComponentType<PropsFallback> | null
}

type PropsFallback = {
  error: Error
  reset: () => void
}

// DEBT: to simplify fallbackRender
export const SystemBoundary: FunctionComponent<Props> = (props) => {
  if (!props.FallbackComponent) {
    return props.children
  }

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) =>
        props.FallbackComponent ? (
          <props.FallbackComponent error={error} reset={resetErrorBoundary} />
        ) : (
          props.children
        )
      }
    >
      {props.children}
    </ErrorBoundary>
  )
}
