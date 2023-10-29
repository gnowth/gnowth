import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'
import { LayoutSectionDeprecated } from './layout-section-deprecated'
import { withAugmentedDeprecated } from './with-augmented-deprecated'

const FormGroupComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSectionDeprecated>
      <form>{t('Form group')}</form>
    </LayoutSectionDeprecated>
  )
}

export const FormGroup = withAugmentedDeprecated()(FormGroupComponent)
