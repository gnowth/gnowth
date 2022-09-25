import type { FunctionComponent } from 'react'
import { LayoutSection, compose, withErrorBoundary, withSuspense } from '@app/core'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import ModelApp from '../models/model-app'

const SectionGroups: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSection>
      <Text>{t('Groups page')}</Text>
    </LayoutSection>
  )
}

export default compose(withSuspense(), withErrorBoundary)(SectionGroups)
