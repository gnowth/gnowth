import type { FunctionComponent } from 'react'
import { Box, Progress } from '@chakra-ui/react'
import { useIsFetching } from 'react-query'

const ViewProgressGlobal: FunctionComponent = () => {
  const isFetching = useIsFetching()

  return <Box minHeight="1">{!!isFetching && <Progress colorScheme="teal" size="xs" isIndeterminate />}</Box>
}

export default ViewProgressGlobal
