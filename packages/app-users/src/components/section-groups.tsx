import type { FunctionComponent } from 'react'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'
import { dependencies } from '../dependencies'

const SectionGroupsComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection>
      <Text>{t('Groups page')}</Text>
    </LayoutSection>
  )
}

export const SectionGroups = withAugmented()(SectionGroupsComponent)
