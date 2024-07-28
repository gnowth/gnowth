import type { ChakraProps } from '@chakra-ui/react'
import type { Attributes, FunctionComponent } from 'react'

import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import packageJson from '../../package.json'
import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

type Props = Attributes & ChakraProps

const SectionFooterComponent: FunctionComponent<Props> = (props) => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <Box as="footer" {...props}>
      <Text fontSize="sm" p="3" textAlign="end">
        <Link href={dependencies.appModel.routes.changelog()} prefetch={false}>
          {t('Current version: {{packageJson.version}}', { packageJson })}
        </Link>
      </Text>

      <Box bg="teal.600">
        <Text color="white" fontSize="sm" p="6" textAlign="center">
          {t('Copyright © 2022 Gnowth')}
        </Text>
      </Box>
    </Box>
  )
}

export const SectionFooter = withAugmented()(SectionFooterComponent)
