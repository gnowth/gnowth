import type { FunctionComponent, PropsWithChildren } from 'react'
import type { ChakraProps } from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'

interface Props {
  containerProps?: ChakraProps
  rootProps?: ChakraProps
}

export const LayoutSectionDeprecated: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  return (
    <Box as="section" {...props.rootProps}>
      <Container maxW="container.xl" {...props.containerProps}>
        {props.children}
      </Container>
    </Box>
  )
}
