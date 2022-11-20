import type { ComponentType, FunctionComponent } from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import { Suspense } from 'react'

import type { HigherComponent } from '../types'
import LayoutSection from '../components/layout-section'

type PropsSuspense = {
  FallbackComponent: ComponentType
}

const DefaultFallback: FunctionComponent = () => (
  <LayoutSection>
    <Box textAlign="center">
      <Spinner thickness="10px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
    </Box>
  </LayoutSection>
)

// DEBT: investigate if there is another way to add suspense without using HOC
// DEBT: spinner to be in the middle of the page if page is empty?
// DEBT: to investigate if suspense should have layout section
function withSuspense<Props extends JSX.IntrinsicAttributes>(
  propsSuspense?: PropsSuspense,
): HigherComponent<Props> {
  const FallbackComponent = propsSuspense?.FallbackComponent ?? DefaultFallback

  return function withSuspenseHOC(Component: ComponentType<Props>): ComponentType<Props> {
    return function ComponentWithSuspense(props) {
      return (
        <Suspense fallback={<FallbackComponent />}>
          <Component {...props} />
        </Suspense>
      )
    }
  }
}

export default withSuspense
