import { Button, Text } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'

import { streamNotifications } from './view-toast-notifications'
import LayoutSection from '../components/layout-section'

function SectionSimulateNotification() {
  return (
    <LayoutSection>
      <Text as="span">Simulate notification in app</Text>

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
        Fire notification
      </Button>
    </LayoutSection>
  )
}

export default SectionSimulateNotification
