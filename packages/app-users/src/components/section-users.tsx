import { Avatar, Skeleton, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { LayoutFlex, LayoutSection, UIButton, UITypography } from '@gnowth/lib-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <UITypography value={t('Name')} variant="label" />
            </Th>

            <Th>
              <UITypography value={t('Role')} variant="label" />
            </Th>

            <Th>
              <UITypography value={t('Email')} variant="label" />
            </Th>

            <Th>
              <UITypography value={t('Status')} variant="label" />
            </Th>

            <Th textAlign="end">
              <Link href={dependencies.appModel.routes.user()} prefetch={false}>
                <UIButton iconValue="add" palette="textPrimary" size="sm" variant="icon" />
              </Link>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {data?.data.map((user) => (
            <Tr key={dependencies.userModel.getKey(user)}>
              <Td py="2">
                <LayoutFlex gap="xs">
                  <Avatar name={dependencies.userModel.getNameFull(user)} size="sm" src={user.avatar} />

                  <UITypography value={dependencies.userModel.getNameFull(user)} variant="body2" />
                </LayoutFlex>
              </Td>

              <Td>
                <UITypography value={user.role} variant="body2" />
              </Td>

              <Td>
                <UITypography value={user.email} variant="body2" />
              </Td>

              <Td>
                <UITypography value={user.status} variant="body2" />
              </Td>

              <Td py="2">
                <LayoutFlex gap="xs" variant="horizontalRight">
                  <Link
                    href={dependencies.appModel.routes.user(dependencies.userModel.getId(user))}
                    prefetch={false}
                  >
                    <UIButton iconValue="edit" palette="gray" size="sm" variant="icon" />
                  </Link>

                  <UIButton iconValue="trash" palette="gray" size="sm" variant="icon" />
                </LayoutFlex>
              </Td>
            </Tr>
          ))}
        </Tbody>

        {!!data && (
          <TableCaption>
            <UITypography
              value={t('Showing {{pageCount}} of {{totalCount}}', {
                pageCount: data.data.length,
                totalCount: data.meta.count,
              })}
              variant="caption"
            />
          </TableCaption>
        )}
      </Table>

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

export const SectionUsers = withAugmented({ LoadingComponent: () => <Skeleton height="10" /> })(
  SectionUsersComponent,
)
