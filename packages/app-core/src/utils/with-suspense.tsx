import type { ComponentType, FunctionComponent, ReactNode } from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import { Suspense } from 'react'

import type { HigherComponent } from '../types'
import LayoutSection from '../components/layout-section'

// DEBT: investigate if there is another way to add suspense without using HOC
// DEBT: spinner to be in the middle of the page if page is empty?
// DEBT: to investigate if suspense should have layout section
function withSuspense<Props extends JSX.IntrinsicAttributes>(
  ComponentFallback?: ReactNode,
): HigherComponent<Props> {
  return function withSuspenseHOC(Component: ComponentType<Props>): ComponentType<Props> {
    const ComponentWithSuspense: FunctionComponent<Props> = (props) => {
      const Fallback = (
        <Box textAlign="center">
          <Spinner thickness="10px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
        </Box>
      )

      return (
        <Suspense fallback={<LayoutSection>{ComponentFallback ?? Fallback}</LayoutSection>}>
          <Component {...props} />
        </Suspense>
      )
    }

    return ComponentWithSuspense
  }
}

export default withSuspense
