import { Box, Progress } from '@chakra-ui/react'
import { useIsFetching } from 'react-query'

function ViewProgressGlobal() {
  const isFetching = useIsFetching()

  return <Box minHeight="1">{!!isFetching && <Progress colorScheme="teal" size="xs" isIndeterminate />}</Box>
}

export default ViewProgressGlobal
