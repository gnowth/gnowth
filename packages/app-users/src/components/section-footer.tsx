import type { ChakraProps } from '@chakra-ui/react'
import type { FunctionComponent, Attributes } from 'react'
import { withAugmented } from '@gnowth/app-core'
import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

import { ModelApp } from '../models/model-app'
import packageJson from '../../package.json'

type Props = ChakraProps & Attributes

const SectionFooterComponent: FunctionComponent<Props> = (props) => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <Box as="footer" {...props}>
      <Text fontSize="sm" p="3" textAlign="end">
        <Link href={ModelApp.routes.changelog()} prefetch={false}>
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
