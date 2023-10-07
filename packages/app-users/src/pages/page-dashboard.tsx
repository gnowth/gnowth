import type { FunctionComponent } from 'react'
import { LayoutSection } from '@gnowth/core-app'
import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'

export const PageDashboard: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <LayoutSection>
        <Text>{t('Dashboard page')}</Text>
      </LayoutSection>
    </VStack>
  )
}
