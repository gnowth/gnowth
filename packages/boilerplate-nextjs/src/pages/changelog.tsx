import { VStack } from '@chakra-ui/react'

import SectionChangelog from '../views/section-changelog'

function PageChangelog() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <SectionChangelog />
    </VStack>
  )
}

export default PageChangelog
