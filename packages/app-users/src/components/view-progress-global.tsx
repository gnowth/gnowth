import type { FunctionComponent } from 'react'

import { Box, Progress } from '@chakra-ui/react'
import { useIsFetching } from '@tanstack/react-query'

export const ViewProgressGlobal: FunctionComponent = () => {
  const isFetching = useIsFetching()

  return <Box minHeight="1">{!!isFetching && <Progress colorScheme="teal" isIndeterminate size="xs" />}</Box>
}
