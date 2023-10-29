import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'
import { LayoutSectionDeprecated } from './layout-section-deprecated'
import { withAugmentedDeprecated } from './with-augmented-deprecated'

const FormGroupFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSectionDeprecated>
      <form>{t('Group filter')}</form>
    </LayoutSectionDeprecated>
  )
}

export const FormGroupFilter = withAugmentedDeprecated()(FormGroupFilterComponent)
