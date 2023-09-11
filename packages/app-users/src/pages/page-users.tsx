import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import { FormUserFilter } from '../components/form-user-filter'
import { SectionUsers } from '../components/section-users'

export const PageUsers: FunctionComponent = () => {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <FormUserFilter />

      <SectionUsers />
    </VStack>
  )
}
