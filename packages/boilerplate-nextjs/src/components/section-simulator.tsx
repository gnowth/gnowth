import { LayoutSection, ModelError } from '@gnowth/app-core'
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker/locale/en'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

import { streamToasts } from '../services/stream-toasts'

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
              streamToasts.pushNotification({
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
            onClick={() => streamToasts.pushError(ModelError.fromError(new Error('Unknown error')))}
          >
            {t('Fire error')}
          </Button>
        </Box>
      </VStack>
    </LayoutSection>
  )
}
