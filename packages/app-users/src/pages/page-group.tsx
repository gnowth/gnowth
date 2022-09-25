import { VStack } from '@chakra-ui/react'

import FormGroup from '../components/form-group'
import FrameDefault from '../components/frame-default'

function PageGroup() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <FormGroup />
    </VStack>
  )
}

PageGroup.Layout = FrameDefault

export default PageGroup
