import type { FunctionComponent } from 'react'

import { Button, Heading, Spacer } from '@chakra-ui/react'
import { LayoutStack } from '@gnowth/lib-react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { LayoutSection } from './layout-section'
import { NavLink } from './nav-link'
import { ViewProgressGlobal } from './view-progress-global'
import { withAugmented } from './with-augmented'

// DEBT: remove prefetch in link where possible
const SectionHeaderComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)

  return (
    <div data-semantic="Header" data-testid="app-users--section-header">
      <LayoutSection
        rootProps={{
          bg: 'teal.600',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          paddingY: '3',
        }}
      >
        <LayoutStack gap="none" variant="horizontal">
          <Heading color="white" size="md">
            {t('Teams App')}
          </Heading>

          <Spacer />

          <LayoutStack gap="xs" variant="horizontal">
            <Button size="xs">{t('Sign up')}</Button>

            <Button size="xs">{t('Log in')}</Button>
          </LayoutStack>
        </LayoutStack>
      </LayoutSection>

      <LayoutSection
        containerProps={{ px: '0' }}
        rootProps={{
          bg: 'teal.50',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
        }}
      >
        <LayoutStack gap="xs" variant="horizontal">
          <NavLink href={dependencies.appModel.routes.dashboard()} prefetch={false}>
            {t('Dashboard')}
          </NavLink>

          <NavLink href={dependencies.appModel.routes.groups()} prefetch={false}>
            {t('Teams')}
          </NavLink>

          <NavLink
            href={dependencies.appModel.routes.users()}
            hrefActive={dependencies.appModel.routes.user()}
            prefetch={false}
          >
            {t('Members')}
          </NavLink>

          <NavLink href={dependencies.appModel.routes.reports()} prefetch={false}>
            {t('Reports')}
          </NavLink>

          <NavLink
            href={dependencies.appModel.routes.generated()}
            hrefActive={dependencies.appModel.routes.generated('')}
            prefetch={false}
          >
            {t('Generated page')}
          </NavLink>
        </LayoutStack>
      </LayoutSection>

      <ViewProgressGlobal />
    </div>
  )
}

export const SectionHeader = withAugmented()(SectionHeaderComponent)
