import type { FunctionComponent, PropsWithChildren } from 'react'
import { ViewSpacerDeprecated } from '@gnowth/app-core'
import { VStack } from '@chakra-ui/react'

import { SectionFooter } from './section-footer'
import { SectionHeader } from './section-header'

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
