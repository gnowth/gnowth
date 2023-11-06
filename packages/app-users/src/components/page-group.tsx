import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import { FormGroup } from './form-group'

export const PageGroup: FunctionComponent = () => {
  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <FormGroup />
    </VStack>
  )
}
