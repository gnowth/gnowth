import type { ComponentType, FunctionComponent } from 'react'
import { Button, Text } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { useQueryErrorResetBoundary } from 'react-query'

import type { HigherComponent } from '../types'
import LayoutSection from '../components/layout-section'

type PropsFallback = {
  error: Error
  reset: () => void
}

type PropsBoundary = {
  FallbackComponent: ComponentType<PropsFallback>
}

const DefaultFallback: FunctionComponent<PropsFallback> = (props) => {
  const { t } = useTranslation('app-core')
  const { reset } = useQueryErrorResetBoundary()

  return (
    <LayoutSection>
      <Text as="span">{t('There was an error!')}</Text>

      <Button
        ml="4"
        onClick={() => {
          props.reset()
          reset()
        }}
      >
        {t('Try again')}
      </Button>
    </LayoutSection>
  )
}

// DEBT: Error component not to have layout if it is inline
function withBoundary<Props extends JSX.IntrinsicAttributes>(
  propsBoundary?: PropsBoundary,
): HigherComponent<Props> {
  const FallbackComponent = propsBoundary?.FallbackComponent ?? DefaultFallback

  return function withBoundaryHOC(Component: ComponentType<Props>): ComponentType<Props> {
    return function ComponentWithErrorBoundary(props) {
      return (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <FallbackComponent error={error} reset={resetErrorBoundary} />
          )}
        >
          <Component {...props} />
        </ErrorBoundary>
      )
    }
  }
}
export default withBoundary
