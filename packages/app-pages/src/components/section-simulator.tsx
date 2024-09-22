import { faker } from '@faker-js/faker/locale/en'
import {
  ErrorModel,
  LayoutSection,
  LayoutStack,
  NotificationStream,
  PlatformConstant,
  UIButton,
  UITypography,
  usePlatformProvider,
} from '@gnowth/lib-react'
import { v4 as uuid } from 'uuid'

const errorModel = new ErrorModel()

export function SectionSimulator() {
  const notificationStreamState = usePlatformProvider<NotificationStream>({
    name: PlatformConstant.notificationStream,
    type: 'provider',
  })

  if (notificationStreamState.loading) {
    return null
  }

  if (notificationStreamState.error) {
    throw notificationStreamState.error
  }

  return (
    <LayoutSection variant="container">
      <LayoutStack gap="xl">
        <LayoutStack variant="horizontal">
          <UITypography as="span" value="Simulate notification in app" />

          <UIButton
            onClick={() =>
              notificationStreamState.value?.pushNotification({
                id: uuid(),
                message: faker.lorem.sentence(),
                title: faker.lorem.words(3),
              })
            }
            textValue="Fire notification"
          />
        </LayoutStack>

        <LayoutStack variant="horizontal">
          <UITypography as="span" value="Simulate error in app" />

          <UIButton
            onClick={() =>
              notificationStreamState.value?.pushError(errorModel.fromError(new Error('Unknown error')))
            }
            textValue="Fire error"
          />
        </LayoutStack>
      </LayoutStack>
    </LayoutSection>
  )
}
