import type { FunctionComponent } from 'react'

import { VStack } from '@chakra-ui/react'

import { FormUserFilter } from './form-user-filter'
import { SectionUsers } from './section-users'

export const PageUsers: FunctionComponent = () => {
  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <FormUserFilter />

      <SectionUsers />
    </VStack>
  )
}
