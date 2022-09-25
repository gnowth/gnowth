import { VStack } from '@chakra-ui/react'

import FrameDefault from '../components/frame-default'
import SectionGroups from '../components/section-groups'
import SectionGroupsFilter from '../components/form-group-filter'

function PageGroups() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <SectionGroupsFilter />

      <SectionGroups />
    </VStack>
  )
}

PageGroups.Layout = FrameDefault

export default PageGroups
