import { LayoutSection } from '@app/core'
import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import FrameDefault from '../components/frame-default'
import ModelApp from '../models/model-app'

function PageDashboard() {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <LayoutSection>
        <Text>{t('Dashboard page')}</Text>
      </LayoutSection>
    </VStack>
  )
}

PageDashboard.Layout = FrameDefault

export default PageDashboard
