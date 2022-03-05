import { VStack } from '@chakra-ui/react'

import SectionContacts from '../views/section-members'
import SectionContactsFilter from '../views/section-members-filter'

function PageContacts() {
  return (
    <VStack as="main" alignItems="stretch">
      <SectionContactsFilter />

      <SectionContacts />
    </VStack>
  )
}

export default PageContacts
