import type { FunctionComponent, ReactNode } from 'react'
import { VStack } from '@chakra-ui/react'

import { compose } from '../utils/compose'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

interface Props {
  children: ReactNode
}

const FrameGenerated: FunctionComponent<Props> = (props) => {
  return (
    <VStack alignItems="stretch" minHeight="100vh" spacing="10">
      {props.children}
    </VStack>
  )
}

export default compose(withSuspense(), withErrorBoundary)(FrameGenerated)
