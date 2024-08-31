import type { FunctionComponent } from 'react'

import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { LayoutSection } from './layout-section'

export const PageDashboard: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection>
      <Text>{t('Dashboard page')}</Text>
    </LayoutSection>
  )
}
