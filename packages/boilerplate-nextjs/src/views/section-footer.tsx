import type { ChakraProps } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'

import ModelApp from '../models/model-app'
import packageJson from '../../package.json'

function SectionFooter(props: ChakraProps) {
  return (
    <Box as="footer" {...props}>
      <Text p="3" fontSize="sm" textAlign="end">
        <Link href={ModelApp.routes.changelogs()}>{`Current version: ${packageJson.version}`}</Link>
      </Text>

      <Box bg="teal.600">
        <Text color="white" p="6" fontSize="sm" textAlign="center">
          Copyright © 2022 Gnowth
        </Text>
      </Box>
    </Box>
  )
}

export default SectionFooter