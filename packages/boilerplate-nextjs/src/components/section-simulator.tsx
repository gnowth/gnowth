import { faker } from '@faker-js/faker/locale/en'
import { LayoutSection, LayoutStack, UIButton, UITypography } from '@gnowth/lib-react'
import { v4 as uuid } from 'uuid'

import { dependencies } from '../dependencies'

export function SectionSimulator() {
  return (
    <LayoutSection variant="container">
      <LayoutStack gap="xl">
        <LayoutStack variant="horizontal">
          <UITypography as="span" value="Simulate notification in app" />

          <UIButton
            onClick={() =>
              dependencies.notificationStream.pushNotification({
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
              dependencies.notificationStream.pushError(
                dependencies.errorModel.fromError(new Error('Unknown error')),
              )
            }
            textValue="Fire error"
          />
        </LayoutStack>
      </LayoutStack>
    </LayoutSection>
  )
}
