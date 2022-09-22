import type { ComponentType, FunctionComponent } from 'react'
import { Button, Text } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { useQueryErrorResetBoundary } from 'react-query'

import LayoutSection from '../components/layout-section'

// DEBT: Error component not to have layout if it is inline
function withErrorBoundary<Props extends JSX.IntrinsicAttributes>(
  Component: ComponentType<Props>,
): ComponentType<Props> {
  const ComponentWithErrorBoundary: FunctionComponent<Props> = (props) => {
    const { t } = useTranslation()
    const { reset } = useQueryErrorResetBoundary()

    return (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <LayoutSection>
            <Text as="span">{t('There was an error!')}</Text>

            <Button ml="4" onClick={() => resetErrorBoundary()}>
              {t('Try again')}
            </Button>
          </LayoutSection>
        )}
      >
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  return ComponentWithErrorBoundary
}

export default withErrorBoundary
