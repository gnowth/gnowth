import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import FormGroup from '../components/form-group'

const PageGroup: FunctionComponent = () => {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <FormGroup />
    </VStack>
  )
}

export default PageGroup
