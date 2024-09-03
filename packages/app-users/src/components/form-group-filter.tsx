import type { FunctionComponent } from 'react'

import { LayoutSection, UITypography } from '@gnowth/lib-react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

const FormGroupFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection variant="container">
      <UITypography value={t('Group filter')} />
    </LayoutSection>
  )
}

export const FormGroupFilter = withAugmented()(FormGroupFilterComponent)
