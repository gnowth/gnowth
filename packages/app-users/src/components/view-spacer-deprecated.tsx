import type { ChakraProps } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'

export const ViewSpacerDeprecated: FunctionComponent<ChakraProps> = (props) => {
  return <Box flex="1" sx={{ marginTop: '0 !important' }} {...props} />
}
