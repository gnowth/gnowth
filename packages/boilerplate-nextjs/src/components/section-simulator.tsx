import { Button } from '@chakra-ui/react'
import { faker } from '@faker-js/faker/locale/en'
import { LayoutSection } from '@gnowth/app-users'
import { LayoutStack, UIBox, UITypography } from '@gnowth/lib-react'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

import { dependencies } from '../dependencies'

export function SectionSimulator() {
  const { t } = useTranslation('other')

  return (
    <LayoutSection>
      <LayoutStack gap="xl">
        <UIBox>
          <UITypography as="span" value={t('Simulate notification in app')} />

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
        </UIBox>

        <UIBox>
          <UITypography as="span" value={t('Simulate error in app')} />

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
        </UIBox>
      </LayoutStack>
    </LayoutSection>
  )
}
