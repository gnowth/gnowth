import type { FunctionComponent } from 'react'

// TODO: find a way to import md properly
// import MdChangelog from '../../CHANGELOG.md'
import { LayoutSection, UITypography } from '@gnowth/lib-react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

const SectionChangelogComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection variant="container">
      <UITypography value={t('Changelog')} />
    </LayoutSection>
  )
}

export const SectionChangelog = withAugmented()(SectionChangelogComponent)
