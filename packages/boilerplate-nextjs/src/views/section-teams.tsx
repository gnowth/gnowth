import type { FunctionComponent } from 'react'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { compose } from '../utils/compose'
import LayoutSection from '../components/layout-section'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

const SectionTeams: FunctionComponent = () => {
  const { t } = useTranslation('other')

  return (
    <LayoutSection>
      <Text>{t('Teams page')}</Text>
    </LayoutSection>
  )
}

export default compose(withSuspense(), withErrorBoundary)(SectionTeams)
