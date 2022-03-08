import { Button, Text } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

import { streamNotifications } from './system-toast-notifications'
import LayoutSection from '../components/layout-section'

function SectionSimulateNotification() {
  const { t } = useTranslation()

  return (
    <LayoutSection>
      <Text as="span">{t('Simulate notification in app')}</Text>

      <Button
        ml="4"
        onClick={() =>
          streamNotifications.actions.addNotification({
            id: uuid(),
            message: faker.lorem.sentence(),
            title: faker.lorem.words(3),
          })
        }
      >
        {t('Fire notification')}
      </Button>
    </LayoutSection>
  )
}

export default SectionSimulateNotification
