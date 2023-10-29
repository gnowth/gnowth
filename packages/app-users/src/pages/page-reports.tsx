import type { FunctionComponent } from 'react'
import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../modules/app.models'
import { LayoutSection } from '../exports'

export const PageReports: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <LayoutSection>
        <Text>{t('Reports page')}</Text>
      </LayoutSection>
    </VStack>
  )
}
