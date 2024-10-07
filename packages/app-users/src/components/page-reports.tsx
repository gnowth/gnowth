import { LayoutPage, LayoutSection, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { AppUserConstant } from '../modules/app-users'

export const PageReports: FunctionComponent = () => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  return (
    <LayoutPage>
      <LayoutSection variant="container">
        <UITypography value={t('Reports page')} />
      </LayoutSection>
    </LayoutPage>
  )
}
