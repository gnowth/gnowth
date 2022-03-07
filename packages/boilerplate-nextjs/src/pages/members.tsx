import { VStack } from '@chakra-ui/react'

import FormMemberFilter from '../views/form-member-filter'
import SectionMember from '../views/section-members'

function PageContacts() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <FormMemberFilter />

      <SectionMember />
    </VStack>
  )
}

export default PageContacts
