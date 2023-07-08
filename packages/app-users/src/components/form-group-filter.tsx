import type { FunctionComponent } from 'react'
import { LayoutSection, withAugmented } from '@gnowth/core-app'
import { useTranslation } from 'react-i18next'

import ModelApp from '../models/model-app'

const FormGroupFilter: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <LayoutSection>
      <form>{t('Group filter')}</form>
    </LayoutSection>
  )
}

export default withAugmented()(FormGroupFilter)
