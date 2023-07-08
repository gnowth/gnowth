'use client'

import type { FunctionComponent } from 'react'
import { LayoutSection } from '@gnowth/core-app'
import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import ModelApp from '../models/model-app'

const PageReports: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <LayoutSection>
        <Text>{t('Reports page')}</Text>
      </LayoutSection>
    </VStack>
  )
}

export default PageReports
