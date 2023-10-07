import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import { SectionChangelog } from '../components/section-changelog'

export const PageChangelog: FunctionComponent = () => {
  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <SectionChangelog />
    </VStack>
  )
}
