import { VStack } from '@chakra-ui/react'

import FrameDefault from '../components/frame-default'
import SectionChangelog from '../components/section-changelog'

function PageChangelog() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <SectionChangelog />
    </VStack>
  )
}

PageChangelog.Layout = FrameDefault

export default PageChangelog
