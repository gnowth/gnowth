import type { FunctionComponent } from 'react'
import { LayoutSection, withAugmented } from '@gnowth/core-app'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'

const FormGroupFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSection>
      <form>{t('Group filter')}</form>
    </LayoutSection>
  )
}

export const FormGroupFilter = withAugmented()(FormGroupFilterComponent)
