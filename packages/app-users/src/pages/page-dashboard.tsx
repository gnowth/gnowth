import type { FunctionComponent } from 'react'
import { LayoutSectionDeprecated } from '@gnowth/app-core'
import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'

export const PageDashboard: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <LayoutSectionDeprecated>
        <Text>{t('Dashboard page')}</Text>
      </LayoutSectionDeprecated>
    </VStack>
  )
}
