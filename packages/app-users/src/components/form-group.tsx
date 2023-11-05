import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'
import { dependencies } from '../dependencies'

const FormGroupComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection>
      <form>{t('Form group')}</form>
    </LayoutSection>
  )
}

export const FormGroup = withAugmented()(FormGroupComponent)
