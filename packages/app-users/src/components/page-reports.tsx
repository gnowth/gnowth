import type { FunctionComponent } from 'react'

import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { LayoutSection } from './layout-section'

export const PageReports: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <LayoutSection>
        <Text>{t('Reports page')}</Text>
      </LayoutSection>
    </VStack>
  )
}
