import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import { FormUser } from '../components/form-user'

export const PageUser: FunctionComponent = () => {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <FormUser />
    </VStack>
  )
}
