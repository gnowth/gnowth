import { VStack } from '@chakra-ui/react'

import SectionSimulateError from '../views/section-simulate-error'
import SectionSimulateNotification from '../views/section-simulate-notification'

function PageDashboard() {
  return (
    <VStack as="main" alignItems="stretch">
      <SectionSimulateError />

      <SectionSimulateNotification />
    </VStack>
  )
}

export default PageDashboard
