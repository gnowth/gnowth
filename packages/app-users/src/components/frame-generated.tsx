import type { FunctionComponent, ReactNode } from 'react'
import { compose, withErrorBoundary, withSuspense } from '@app/core'
import { VStack } from '@chakra-ui/react'

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
