import type { ComponentType } from 'react'
import { Button, Text } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'
import { useQueryErrorResetBoundary } from 'react-query'

import LayoutSection from '../components/layout-section'

function withErrorBoundary<Props>(Component: ComponentType<Props>) {
  return function ComponentWithErrorBoundary(props: Props) {
    const { reset } = useQueryErrorResetBoundary()
    return (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <LayoutSection>
            <Text as="span">There was an error!</Text>

            <Button ml="4" onClick={() => resetErrorBoundary()}>
              Try again
            </Button>
          </LayoutSection>
        )}
      >
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

export default withErrorBoundary
