import { VStack } from '@chakra-ui/react'

import SectionTeams from '../views/section-teams'
import SectionTeamsFilter from '../views/section-teams-filter'

function PageTeams() {
  return (
    <VStack as="main" alignItems="stretch">
      <SectionTeamsFilter />

      <SectionTeams />
    </VStack>
  )
}

export default PageTeams
