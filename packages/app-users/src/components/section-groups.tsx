import type { FunctionComponent } from 'react'
import { LayoutSection, withAugmented } from '@gnowth/app-core'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'

const SectionGroupsComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSection>
      <Text>{t('Groups page')}</Text>
    </LayoutSection>
  )
}

export const SectionGroups = withAugmented()(SectionGroupsComponent)
