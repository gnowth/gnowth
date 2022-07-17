import type { ChakraProps } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import * as R from 'ramda'

import type { HigherComponent } from '../types'
import ModelApp from '../models/model-app'
import packageJson from '../../package.json'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

function SectionFooter(props: ChakraProps) {
  const { t } = useTranslation()

  return (
    <Box as="footer" {...props}>
      <Text p="3" fontSize="sm" textAlign="end">
        <Link href={ModelApp.routes.changelogs()}>
          {t('Current version: {{packageJson.version}}', { packageJson })}
        </Link>
      </Text>

      <Box bg="teal.600">
        <Text color="white" p="6" fontSize="sm" textAlign="center">
          {t('Copyright © 2022 Gnowth')}
        </Text>
      </Box>
    </Box>
  )
}

export default R.compose(
  withSuspense() as HigherComponent<ChakraProps>,
  withErrorBoundary as HigherComponent<ChakraProps>,
)(SectionFooter as FunctionComponent<ChakraProps>)
