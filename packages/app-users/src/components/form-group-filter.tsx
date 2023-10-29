import type { FunctionComponent } from 'react'
import { LayoutSectionDeprecated, withAugmentedDeprecated } from '@gnowth/app-core'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'

const FormGroupFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSectionDeprecated>
      <form>{t('Group filter')}</form>
    </LayoutSectionDeprecated>
  )
}

export const FormGroupFilter = withAugmentedDeprecated()(FormGroupFilterComponent)
