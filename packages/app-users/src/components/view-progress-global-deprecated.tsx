import type { FunctionComponent } from 'react'
import { Box, Progress } from '@chakra-ui/react'
import { useIsFetching } from 'react-query'

export const ViewProgressGlobalDeprecated: FunctionComponent = () => {
  const isFetching = useIsFetching()

  return <Box minHeight="1">{!!isFetching && <Progress colorScheme="teal" isIndeterminate size="xs" />}</Box>
}
