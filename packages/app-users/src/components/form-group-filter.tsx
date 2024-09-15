import { LayoutSection, UITypography, useTranslation } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

const FormGroupFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection variant="container">
      <UITypography value={t('Group filter')} />
    </LayoutSection>
  )
}

export const FormGroupFilter = withAugmented()(FormGroupFilterComponent)
