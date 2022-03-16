import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { streamErrors } from './system-toast-errors'
import LayoutSection from '../components/layout-section'

function SectionSimulateError() {
  const { t } = useTranslation('other')

  return (
    <LayoutSection>
      <Text as="span">{t('Simulate error in app')}</Text>

      <Button ml="4" onClick={() => streamErrors.actions.addError(new Error('Unknown error'))}>
        {t('Fire error')}
      </Button>
    </LayoutSection>
  )
}

export default SectionSimulateError
