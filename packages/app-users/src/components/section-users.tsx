import type { FunctionComponent } from 'react'

import {
  LayoutFlex,
  LayoutGrid,
  LayoutSection,
  LayoutStack,
  UIAvatar,
  UIButton,
  UISkeleton,
  UITypography,
  useTranslation,
} from '@gnowth/lib-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Fragment, useMemo } from 'react'
import { atom, useRecoilState } from 'recoil'

import { dependencies } from '../dependencies'
import { InputPagination } from './input-pagination'
import { withAugmented } from './with-augmented'

export const stateUserFilter = atom({
  default: dependencies.userFilterModel.generatePaginated(),
  key: 'usersFilter',
})

// DEBT: investigate if we should have a function to generate shouldShows?
// DEBT: Add message when number of results return is 0
// DEBT: Update users buttons to use icons? and only visible on hover
// DEBT: Make add new user button more visible
const SectionUsersComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)
  const [filters, setFilters] = useRecoilState(stateUserFilter)
  const filtersData = useMemo(() => dependencies.userFilterModel.toData(filters), [filters])
  const { data } = useSuspenseQuery(dependencies.userService.listOptions({ filtersData }))

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
            <Link href={dependencies.appModel.routes.user()} prefetch={false}>
              <UIButton iconValue="add" palette="gray" size="sm" variant="icon" />
            </Link>
          </LayoutFlex>

          {data?.data.map((user) => (
            <Fragment key={dependencies.userModel.getKey(user)}>
              <LayoutFlex gap="xs">
                <UIAvatar name={dependencies.userModel.getNameFull(user)} size="sm" src={user.avatar} />

                <UITypography value={dependencies.userModel.getNameFull(user)} variant="body2" />
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
                <Link
                  href={dependencies.appModel.routes.user(dependencies.userModel.getId(user))}
                  prefetch={false}
                >
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
