import type { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { compose } from '../utils/compose'
import LayoutSection from '../components/layout-section'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

const FormTeam: FunctionComponent = () => {
  const { t } = useTranslation('other')

  return (
    <LayoutSection>
      <form>{t('Form team')}</form>
    </LayoutSection>
  )
}

export default compose(withSuspense(), withErrorBoundary)(FormTeam)
