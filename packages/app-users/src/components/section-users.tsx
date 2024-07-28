import {
  Avatar,
  Button,
  HStack,
  Skeleton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { atom, useRecoilState } from 'recoil'

import { dependencies } from '../dependencies'
import { InputPagination } from './input-pagination'
import { LayoutSection } from './layout-section'
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
  const { data } = useQuery(
    dependencies.userService.queryKeys.list(filtersData),
    dependencies.userService.list,
  )

  return (
    <LayoutSection>
      <VStack spacing="10">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>{t('Name')}</Th>

              <Th>{t('Role')}</Th>

              <Th>{t('Email')}</Th>

              <Th>{t('Status')}</Th>

              <Th textAlign="end">
                <Link href={dependencies.appModel.routes.user()} prefetch={false}>
                  {t('Add new user')}
                </Link>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data?.data.map((user) => (
              <Tr key={dependencies.userModel.getKey(user)}>
                <Td py="2">
                  <HStack>
                    <Avatar name={dependencies.userModel.getNameFull(user)} size="sm" src={user.avatar} />

                    <Text>{dependencies.userModel.getNameFull(user)}</Text>
                  </HStack>
                </Td>

                <Td>{user.role}</Td>

                <Td>{user.email}</Td>

                <Td>{user.status}</Td>

                <Td py="2">
                  <HStack justifyContent="flex-end">
                    <Link
                      href={dependencies.appModel.routes.user(dependencies.userModel.getId(user))}
                      prefetch={false}
                    >
                      {t('Edit')}
                    </Link>

                    <Button size="xs">{t('Deactivate')}</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>

          {!!data && (
            <TableCaption>
              {t('Showing {{pageCount}} of {{totalCount}}', {
                pageCount: data.data.length,
                totalCount: data.meta.count,
              })}
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
      </VStack>
    </LayoutSection>
  )
}

export const SectionUsers = withAugmented({ LoadingComponent: () => <Skeleton height="10" /> })(
  SectionUsersComponent,
)
