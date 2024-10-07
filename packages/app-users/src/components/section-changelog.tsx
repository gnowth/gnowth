import { LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

// TODO: find a way to import md properly
// import MdChangelog from '../../CHANGELOG.md'

import { AppUserConstant } from '../modules/app-users'
import { withAugmented } from './with-augmented'

const SectionChangelogComponent: FunctionComponent = () => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  return (
    <LayoutSection variant="container">
      <UITypography value={t('Changelog')} />
    </LayoutSection>
  )
}

export const SectionChangelog = withAugmented()(SectionChangelogComponent)
