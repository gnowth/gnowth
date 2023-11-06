import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import { FormUser } from './form-user'

export const PageUser: FunctionComponent = () => {
  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <FormUser />
    </VStack>
  )
}
