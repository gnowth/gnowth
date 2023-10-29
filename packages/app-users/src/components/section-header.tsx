import type { FunctionComponent } from 'react'
import { Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { NavLink } from './nav-link'
import { LayoutSection } from './layout-section'
import { ViewProgressGlobal } from './view-progress-global'
import { withAugmented } from './with-augmented'
import { dependencies } from '../dependencies'

// DEBT: remobe prefect in link where possible
const SectionHeaderComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.modelApp.namespace)

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
        containerProps={{ px: '0' }}
        rootProps={{
          bg: 'teal.50',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
        }}
      >
        <HStack>
          <NavLink href={dependencies.modelApp.routes.dashboard()} prefetch={false}>
            {t('Dashboard')}
          </NavLink>

          <NavLink href={dependencies.modelApp.routes.groups()} prefetch={false}>
            {t('Teams')}
          </NavLink>

          <NavLink href={dependencies.modelApp.routes.users()} prefetch={false}>
            {t('Members')}
          </NavLink>

          <NavLink href={dependencies.modelApp.routes.reports()} prefetch={false}>
            {t('Reports')}
          </NavLink>

          <NavLink
            href={dependencies.modelApp.routes.generated()}
            hrefActive={dependencies.modelApp.routes.generated('')}
            prefetch={false}
          >
            {t('Generated page')}
          </NavLink>
        </HStack>
      </LayoutSection>

      <ViewProgressGlobal />
    </div>
  )
}

export const SectionHeader = withAugmented()(SectionHeaderComponent)
