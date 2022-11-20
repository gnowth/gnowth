import type { FunctionComponent } from 'react'
import { LayoutSection, compose, withBoundary, withSuspense } from '@app/core'
import { useTranslation } from 'react-i18next'

import ModelApp from '../models/model-app'

const FormGroup: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSection>
      <form>{t('Form group')}</form>
    </LayoutSection>
  )
}

export default compose(withSuspense(), withBoundary())(FormGroup)
