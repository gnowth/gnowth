import type { FunctionComponent } from 'react'
import { VStack } from '@chakra-ui/react'

import SectionGroups from '../components/section-groups'
import SectionGroupsFilter from '../components/form-group-filter'

const PageGroups: FunctionComponent = () => {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <SectionGroupsFilter />

      <SectionGroups />
    </VStack>
  )
}

export default PageGroups
