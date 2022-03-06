import { Text, VStack } from '@chakra-ui/react'

import LayoutSection from '../components/layout-section'

function PageReport() {
  return (
    <VStack as="main" alignItems="stretch" spacing="10">
      <LayoutSection>
        <Text>Reports</Text>
      </LayoutSection>
    </VStack>
  )
}

export default PageReport
