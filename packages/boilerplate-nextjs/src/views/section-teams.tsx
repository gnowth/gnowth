import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import * as R from 'ramda'

import LayoutSection from '../components/layout-section'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

function SectionTeams() {
  const { t } = useTranslation('other')

  return (
    <LayoutSection>
      <Text>{t('Teams page')}</Text>
    </LayoutSection>
  )
}

export default R.compose(withSuspense(), withErrorBoundary)(SectionTeams)
