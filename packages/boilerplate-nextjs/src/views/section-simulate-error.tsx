import { Button, Text } from '@chakra-ui/react'

import { streamErrors } from './view-toast-errors'
import LayoutSection from '../components/layout-section'

function SectionSimulatorError() {
	return (
		<LayoutSection>
			<Text as="span">Simulate error in app</Text>

			<Button ml="4" onClick={() => streamErrors.actions.addError(new Error('Unknown error'))}>
				Fire error
			</Button>
		</LayoutSection>
	)
}

export default SectionSimulatorError
