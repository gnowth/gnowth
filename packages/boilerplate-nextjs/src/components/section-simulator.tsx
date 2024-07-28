import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker/locale/en'
import { LayoutSection } from '@gnowth/app-users'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

import { dependencies } from '../dependencies'

export function SectionSimulator() {
  const { t } = useTranslation('other')

  return (
    <LayoutSection>
      <VStack alignItems="stretch" spacing="10">
        <Box>
          <Text as="span">{t('Simulate notification in app')}</Text>

          <Button
            ml="4"
            onClick={() =>
              dependencies.notificationStream.pushNotification({
                id: uuid(),
                message: faker.lorem.sentence(),
                title: faker.lorem.words(3),
              })
            }
          >
            {t('Fire notification')}
          </Button>
        </Box>

        <Box>
          <Text as="span">{t('Simulate error in app')}</Text>

          <Button
            ml="4"
            onClick={() =>
              dependencies.notificationStream.pushError(
                dependencies.errorModel.fromError(new Error('Unknown error')),
              )
            }
          >
            {t('Fire error')}
          </Button>
        </Box>
      </VStack>
    </LayoutSection>
  )
}
