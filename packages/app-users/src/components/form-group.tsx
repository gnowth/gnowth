import type { FunctionComponent } from 'react'

import { LayoutSection, UITypography, useTranslation } from '@gnowth/lib-react'

import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

const FormGroupComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection variant="container">
      <UITypography value={t('Form group')} />
    </LayoutSection>
  )
}

export const FormGroup = withAugmented()(FormGroupComponent)
