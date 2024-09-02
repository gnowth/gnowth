import type { FunctionComponent } from 'react'

import { UITypography } from '@gnowth/lib-react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'

const FormGroupFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <LayoutSection>
      <form>
        <UITypography value={t('Group filter')} />
      </form>
    </LayoutSection>
  )
}

export const FormGroupFilter = withAugmented()(FormGroupFilterComponent)
