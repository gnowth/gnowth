import type { FunctionComponent } from 'react'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'
import { LayoutSectionDeprecated } from './layout-section-deprecated'
import { withAugmentedDeprecated } from './with-augmented-deprecated'

const SectionGroupsComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSectionDeprecated>
      <Text>{t('Groups page')}</Text>
    </LayoutSectionDeprecated>
  )
}

export const SectionGroups = withAugmentedDeprecated()(SectionGroupsComponent)
