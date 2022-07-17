import type { ReactNode } from 'react'
import { VStack } from '@chakra-ui/react'
import * as R from 'ramda'

import type { HigherComponent } from '../types'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

interface Props {
  children: ReactNode
}

function FrameGenerated(props: Props) {
  return (
    <VStack alignItems="stretch" minHeight="100vh" spacing="10">
      {props.children}
    </VStack>
  )
}

export default R.compose(
  withSuspense() as HigherComponent<Props>,
  withErrorBoundary as HigherComponent<Props>,
)(FrameGenerated)
