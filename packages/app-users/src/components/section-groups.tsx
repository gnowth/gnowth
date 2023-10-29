import type { FunctionComponent } from 'react'
import { LayoutSectionDeprecated, withAugmentedDeprecated } from '@gnowth/app-core'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'

const SectionGroupsComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSectionDeprecated>
      <Text>{t('Groups page')}</Text>
    </LayoutSectionDeprecated>
  )
}

export const SectionGroups = withAugmentedDeprecated()(SectionGroupsComponent)
