import type { ChakraProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

function ViewSpacer(props: ChakraProps) {
  return <Box flex="1" sx={{ marginTop: '0 !important' }} {...props} />
}

export default ViewSpacer
