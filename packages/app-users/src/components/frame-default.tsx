import type { FunctionComponent, PropsWithChildren } from 'react'
import { ViewSpacer } from '@app/core'
import { VStack } from '@chakra-ui/react'

import SectionFooter from '../components/section-footer'
import SectionHeader from '../components/section-header'

const FrameDefault: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <VStack alignItems="stretch" minHeight="100vh" spacing="10">
      <SectionHeader />

      {props.children}

      <ViewSpacer />

      <SectionFooter />
    </VStack>
  )
}

export default FrameDefault
