import type { FunctionComponent } from 'react'
import { LayoutSection, NavLink, ViewProgressGlobal, withAugmented } from '@gnowth/core-app'
import { Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import ModelApp from '../models/model-app'

// DEBT: remobe prefect in link where possible
const SectionHeader: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <div data-semantic="Header">
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
          <NavLink prefetch={false} href={ModelApp.routes.dashboard()}>
            {t('Dashboard')}
          </NavLink>

          <NavLink prefetch={false} href={ModelApp.routes.groups()}>
            {t('Teams')}
          </NavLink>

          <NavLink prefetch={false} href={ModelApp.routes.users()}>
            {t('Members')}
          </NavLink>

          <NavLink prefetch={false} href={ModelApp.routes.reports()}>
            {t('Reports')}
          </NavLink>

          <NavLink
            prefetch={false}
            href={ModelApp.routes.generated()}
            hrefActive={ModelApp.routes.generated('')}
          >
            {t('Generated page')}
          </NavLink>
        </HStack>
      </LayoutSection>

      <ViewProgressGlobal />
    </div>
  )
}

export default withAugmented()(SectionHeader)
