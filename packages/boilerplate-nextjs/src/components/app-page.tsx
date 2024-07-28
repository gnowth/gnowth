import type { FunctionComponent } from 'react'

import { VStack } from '@chakra-ui/react'

import { SectionSimulator } from '../components/section-simulator'

export const AppPage: FunctionComponent = () => {
  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <SectionSimulator />
    </VStack>
  )
}
