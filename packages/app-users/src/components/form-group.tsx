import type { FunctionComponent } from 'react'
import { LayoutSection, withAugmented } from '@gnowth/app-core'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'

const FormGroupComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSection>
      <form>{t('Form group')}</form>
    </LayoutSection>
  )
}

export const FormGroup = withAugmented()(FormGroupComponent)
