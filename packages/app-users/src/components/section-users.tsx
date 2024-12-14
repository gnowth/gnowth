import {
  LayoutFlex,
  LayoutGrid,
  LayoutSection,
  LayoutStack,
  UIAvatar,
  UIButton,
  UISkeleton,
  UITypography,
  usePlatformControllerSuspense,
  usePlatformProviderSuspense,
} from '@gnowth/lib-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { atom, useAtom } from 'jotai'
import Link from 'next/link'
import { Fragment, FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { dependencies } from '../dependencies'
import { AppUserConstant, AppUserController, AppUserDependency } from '../modules/app-users'
import { UserFilterModel } from '../modules/user-filters'
import { UserModel, UserService } from '../modules/users'
import { InputPagination } from './input-pagination'
import { withAugmented } from './with-augmented'

export const atomUserFilter = atom(dependencies.userFilterModel.generatePaginated())

// DEBT: investigate if we should have a function to generate shouldShows?
// DEBT: Add message when number of results return is 0
// DEBT: Update users buttons to use icons? and only visible on hover
// DEBT: Make add new user button more visible
const SectionUsersComponent: FunctionComponent = () => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  const appUserController = usePlatformControllerSuspense<AppUserController>({
    name: AppUserDependency.appUserController,
  })
  const userModel = usePlatformProviderSuspense<UserModel>({
    name: AppUserDependency.userModel,
  })
  const userService = usePlatformProviderSuspense<UserService>({
    name: AppUserDependency.userService,
  })
  const userFilterModel = usePlatformProviderSuspense<UserFilterModel>({
    name: AppUserDependency.userFilterModel,
  })
  const [filters, setFilters] = useAtom(atomUserFilter)
  const params = useMemo(() => userFilterModel.toParams(filters), [filters, userFilterModel])
  const { data } = useSuspenseQuery(userService.listOptions({ params }))

  return (
    <LayoutSection variant="container">
      <LayoutStack gap="xxs">
        <LayoutGrid gridColumnCount={5} variant="table">
          <LayoutFlex>
            <UITypography value={t('Name')} variant="label" />
          </LayoutFlex>

          <LayoutFlex>
            <UITypography value={t('Role')} variant="label" />
          </LayoutFlex>

          <LayoutFlex>
            <UITypography value={t('Email')} variant="label" />
          </LayoutFlex>

          <LayoutFlex>
            <UITypography value={t('Status')} variant="label" />
          </LayoutFlex>

          <LayoutFlex variant="horizontalRight">
            <Link href={appUserController.routes.user()} prefetch={false}>
              <UIButton iconValue="add" palette="gray" size="sm" variant="icon" />
            </Link>
          </LayoutFlex>

          {data?.data.map((user) => (
            <Fragment key={userModel.getKey(user)}>
              <LayoutFlex gap="xs">
                <UIAvatar name={userModel.getNameFull(user)} size="sm" src={user.avatar} />

                <UITypography value={userModel.getNameFull(user)} variant="body2" />
              </LayoutFlex>

              <LayoutFlex>
                <UITypography value={user.role} variant="body2" />
              </LayoutFlex>

              <LayoutFlex>
                <UITypography value={user.email} variant="body2" />
              </LayoutFlex>

              <LayoutFlex>
                <UITypography value={user.status} variant="body2" />
              </LayoutFlex>

              <LayoutFlex gap="xs" variant="horizontalRight">
                <Link href={appUserController.routes.user(userModel.getId(user))} prefetch={false}>
                  <UIButton iconValue="edit" palette="gray" size="sm" variant="icon" />
                </Link>

                <UIButton iconValue="trash" palette="gray" size="sm" variant="icon" />
              </LayoutFlex>
            </Fragment>
          ))}
        </LayoutGrid>

        {!!data && (
          <LayoutFlex variant="horizontalCenter">
            <UITypography
              value={t('Showing {{pageCount}} of {{totalCount}}', {
                pageCount: data.data.length,
                totalCount: data.meta.count,
              })}
              variant="caption"
            />
          </LayoutFlex>
        )}
      </LayoutStack>

      {/* DEBT add visibility so that there is no Content Layout Shift */}
      {!!data?.meta && !!filters.page && !!filters.pageSize && (
        <InputPagination
          onChange={(newFilters) =>
            setFilters({ ...filters, page: newFilters.page, pageSize: newFilters.pageSize })
          }
          pageCount={data.meta.pages}
          value={{ page: filters.page, pageSize: filters.pageSize }}
        />
      )}
    </LayoutSection>
  )
}

export const SectionUsers = withAugmented({ LoadingComponent: () => <UISkeleton height="xxxl" /> })(
  SectionUsersComponent,
)
