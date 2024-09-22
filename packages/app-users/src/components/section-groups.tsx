import { LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

const SectionGroupsComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection variant="container">
      <UITypography value={t('Groups page')} />
    </LayoutSection>
  )
}

export const SectionGroups = withAugmented()(SectionGroupsComponent)
