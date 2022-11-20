import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import SectionSimulator from '../components/section-simulator'

const AppPage: FunctionComponent = () => {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <SectionSimulator />
    </VStack>
  )
}

export default AppPage
