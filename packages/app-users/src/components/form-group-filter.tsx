import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'
import { dependencies } from '../dependencies'

const FormGroupFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection>
      <form>{t('Group filter')}</form>
    </LayoutSection>
  )
}

export const FormGroupFilter = withAugmented()(FormGroupFilterComponent)
