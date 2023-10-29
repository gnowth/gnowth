import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'
import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'

const FormGroupFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSection>
      <form>{t('Group filter')}</form>
    </LayoutSection>
  )
}

export const FormGroupFilter = withAugmented()(FormGroupFilterComponent)
