import type { FunctionComponent } from 'react'

import { UITypography } from '@gnowth/lib-react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { LayoutSection } from './layout-section'

export const PageReports: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection>
      <UITypography value={t('Reports page')} />
    </LayoutSection>
  )
}
