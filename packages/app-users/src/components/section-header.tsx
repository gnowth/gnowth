import type { FunctionComponent } from 'react'
import {
  LayoutSectionDeprecated,
  ViewProgressGlobalDeprecated,
  withAugmentedDeprecated,
} from '@gnowth/app-core'
import { Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ModelApp } from '../models/model-app'
import { NavLink } from './nav-link'

// DEBT: remobe prefect in link where possible
const SectionHeaderComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)

  return (
    <div data-semantic="Header">
      <LayoutSectionDeprecated
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
      </LayoutSectionDeprecated>

      <LayoutSectionDeprecated
        containerProps={{ px: '0' }}
        rootProps={{
          bg: 'teal.50',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
        }}
      >
        <HStack>
          <NavLink href={ModelApp.routes.dashboard()} prefetch={false}>
            {t('Dashboard')}
          </NavLink>

          <NavLink href={ModelApp.routes.groups()} prefetch={false}>
            {t('Teams')}
          </NavLink>

          <NavLink href={ModelApp.routes.users()} prefetch={false}>
            {t('Members')}
          </NavLink>

          <NavLink href={ModelApp.routes.reports()} prefetch={false}>
            {t('Reports')}
          </NavLink>

          <NavLink
            href={ModelApp.routes.generated()}
            hrefActive={ModelApp.routes.generated('')}
            prefetch={false}
          >
            {t('Generated page')}
          </NavLink>
        </HStack>
      </LayoutSectionDeprecated>

      <ViewProgressGlobalDeprecated />
    </div>
  )
}

export const SectionHeader = withAugmentedDeprecated()(SectionHeaderComponent)
