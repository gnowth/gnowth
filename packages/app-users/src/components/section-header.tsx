import type { FunctionComponent } from 'react'
import {
  LayoutSection,
  NavLink,
  ViewProgressGlobal,
  compose,
  withErrorBoundary,
  withSuspense,
} from '@app/core'
import { Box, Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import ModelApp from '../models/model-app'

const SectionHeader: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <header>
      <LayoutSection
        rootProps={{
          bg: 'teal.600',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          paddingY: '3',
        }}
      >
        <Flex>
          <Heading color="white" size="md">
            {t('Teams App')}
          </Heading>

          <Spacer />

          <HStack>
            <Button size="xs">{t('Sign up')}</Button>

            <Button size="xs">{t('Log in')}</Button>
          </HStack>
        </Flex>
      </LayoutSection>

      <LayoutSection
        rootProps={{
          bg: 'teal.50',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
        }}
        containerProps={{ px: '0' }}
      >
        <HStack>
          <Box>
            <NavLink href={ModelApp.routes.dashboard()}>{t('Dashboard')}</NavLink>
          </Box>

          <Box>
            <NavLink href={ModelApp.routes.groups()}>{t('Teams')}</NavLink>
          </Box>

          <Box>
            <NavLink href={ModelApp.routes.users()}>{t('Members')}</NavLink>
          </Box>

          <Box>
            <NavLink href={ModelApp.routes.reports()}>{t('Reports')}</NavLink>
          </Box>

          <Box>
            <NavLink href={ModelApp.routes.generated()} hrefActive={ModelApp.routes.generated('')}>
              {t('Generated page')}
            </NavLink>
          </Box>
        </HStack>
      </LayoutSection>

      <ViewProgressGlobal />
    </header>
  )
}

export default compose(withSuspense(), withErrorBoundary)(SectionHeader)
