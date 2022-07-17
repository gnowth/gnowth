import type { PropsWithChildren } from 'react'
import type { ChakraProps } from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'

interface Props {
  containerProps?: ChakraProps
  rootProps?: ChakraProps
}

function LayoutSection(props: PropsWithChildren<Props>) {
  return (
    <Box as="section" {...props.rootProps}>
      <Container maxW="container.xl" {...props.containerProps}>
        {props.children}
      </Container>
    </Box>
  )
}

export default LayoutSection
