import type { FunctionComponent } from 'react'

import { VStack } from '@chakra-ui/react'

import { FormGroupFilter } from './form-group-filter'
import { SectionGroups } from './section-groups'

export const PageGroups: FunctionComponent = () => {
  return (
    <VStack alignItems="stretch" as="main" spacing="10">
      <FormGroupFilter />

      <SectionGroups />
    </VStack>
  )
}
