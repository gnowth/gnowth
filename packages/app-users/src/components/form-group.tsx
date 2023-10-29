import type { FunctionComponent } from 'react'
import { LayoutSectionDeprecated, withAugmentedDeprecated } from '@gnowth/app-core'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'

const FormGroupComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSectionDeprecated>
      <form>{t('Form group')}</form>
    </LayoutSectionDeprecated>
  )
}

export const FormGroup = withAugmentedDeprecated()(FormGroupComponent)
