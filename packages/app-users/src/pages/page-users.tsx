import { VStack } from '@chakra-ui/react'

import FormUserFilter from '../components/form-user-filter'
import FrameDefault from '../components/frame-default'
import SectionUsers from '../components/section-users'

function PageUsers() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <FormUserFilter />

      <SectionUsers />
    </VStack>
  )
}

PageUsers.Layout = FrameDefault

export default PageUsers
