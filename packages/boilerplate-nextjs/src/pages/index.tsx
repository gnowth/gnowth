import { VStack } from '@chakra-ui/react'

import SectionSimulator from '../views/section-simulator'

function PageDashboard() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <SectionSimulator />
    </VStack>
  )
}

export default PageDashboard
