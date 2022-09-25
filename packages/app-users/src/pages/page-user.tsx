import { VStack } from '@chakra-ui/react'

import FormUser from '../components/form-group'
import FrameDefault from '../components/frame-default'

function PageUser() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <FormUser />
    </VStack>
  )
}

PageUser.Layout = FrameDefault

export default PageUser
