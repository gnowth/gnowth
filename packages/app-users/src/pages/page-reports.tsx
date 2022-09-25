import { LayoutSection } from '@app/core'
import { Text, VStack } from '@chakra-ui/react'

import FrameDefault from '../components/frame-default'

function PageReports() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <LayoutSection>
        <Text>Reports</Text>
      </LayoutSection>
    </VStack>
  )
}

PageReports.Layout = FrameDefault

export default PageReports
