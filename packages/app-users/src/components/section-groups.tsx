import { LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { AppUserConstant } from '../modules/app-users'
import { withAugmented } from './with-augmented'

const SectionGroupsComponent: FunctionComponent = () => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  return (
    <LayoutSection variant="container">
      <UITypography value={t('Groups page')} />
    </LayoutSection>
  )
}

export const SectionGroups = withAugmented()(SectionGroupsComponent)
