import type { FunctionComponent, PropsWithChildren } from 'react'
import { VStack } from '@chakra-ui/react'

import { SectionFooter } from './section-footer'
import { SectionHeader } from './section-header'
import { ViewSpacerDeprecated } from './view-spacer-deprecated'

export const LayoutDefault: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <VStack alignItems="stretch" minHeight="100vh" spacing="10">
      <SectionHeader />

      {props.children}

      <ViewSpacerDeprecated />

      <SectionFooter />
    </VStack>
  )
}
