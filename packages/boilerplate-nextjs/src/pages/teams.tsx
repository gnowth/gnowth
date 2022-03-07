import { VStack } from '@chakra-ui/react'

import SectionTeams from '../views/section-teams'
import SectionTeamsFilter from '../views/form-team-filter'

function PageTeams() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <SectionTeamsFilter />

      <SectionTeams />
    </VStack>
  )
}

export default PageTeams
