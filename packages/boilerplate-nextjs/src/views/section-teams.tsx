import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import LayoutSection from '../components/layout-section'

function SectionTeams() {
  const { t } = useTranslation()

  return (
    <LayoutSection>
      <Text>{t('Teams page')}</Text>
    </LayoutSection>
  )
}

export default SectionTeams
