import { useTranslation } from 'react-i18next'
import * as R from 'ramda'

import LayoutSection from '../components/layout-section'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

function FormTeam() {
  const { t } = useTranslation('other')

  return (
    <LayoutSection>
      <form>{t('Form team')}</form>
    </LayoutSection>
  )
}

export default R.compose(withSuspense(), withErrorBoundary)(FormTeam)
