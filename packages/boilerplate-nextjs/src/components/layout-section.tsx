import type { PropsWithChildren, ReactElement } from 'react'
import type { ChakraProps } from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'

interface Props {
	boxProps?: ChakraProps
	containerProps?: ChakraProps
}

function LayoutSection(props: PropsWithChildren<Props>): ReactElement {
	return (
		<Box as="section" {...props.boxProps}>
			<Container maxW="container.xl" {...props.containerProps}>
				{props.children}
			</Container>
		</Box>
	)
}

export default LayoutSection
