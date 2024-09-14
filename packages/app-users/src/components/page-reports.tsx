import type { FunctionComponent } from 'react'

import { LayoutPage, LayoutSection, UITypography, useTranslation } from '@gnowth/lib-react'

import { dependencies } from '../dependencies'

export const PageReports: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value={t('Reports page')} />
      </LayoutSection>
    </LayoutPage>
  )
}
