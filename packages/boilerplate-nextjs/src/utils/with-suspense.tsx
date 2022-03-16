import type { ComponentType, FunctionComponent } from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import { Suspense } from 'react'

// DEBT: spinner to be in the middle of the papge if page is empty?
function withSuspense<Props>(Component: ComponentType<Props>): FunctionComponent<Props> {
  return function ComponentWithSuspense(props: Props) {
    return (
      <Suspense
        fallback={
          <Box textAlign="center">
            <Spinner thickness="10px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
          </Box>
        }
      >
        <Component {...props} />
      </Suspense>
    )
  }
}

export default withSuspense
