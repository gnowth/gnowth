import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'

export const PageDashboard: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value={t('Dashboard page')} />
      </LayoutSection>
    </LayoutPage>
  )
}
