import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'
import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'

const FormGroupComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSection>
      <form>{t('Form group')}</form>
    </LayoutSection>
  )
}

export const FormGroup = withAugmented()(FormGroupComponent)
