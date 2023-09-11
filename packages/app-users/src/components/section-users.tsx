import { InputPagination, LayoutSection, withAugmented } from '@gnowth/core-app'
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
import { FunctionComponent, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { atom, useRecoilState } from 'recoil'
import Link from 'next/link'

import { ModelApp } from '../models/model-app'
import { ModelUser } from '../models/model-user'
import { ModelUserFilter } from '../models/model-user-filter'
import { serviceUsers } from '../services/service-users'

export const stateUserFilter = atom({
  key: 'usersFilter',
  default: ModelUserFilter.fromUserFilterSerializedPaginated({}),
})

// DEBT: investigate if we should have a function to generate shouldShows?
// DEBT: Add message when number of results return is 0
// DEBT: Update users buttons to use icons? and only visible on hover
// DEBT: Make add new user button more visible
const SectionUsersComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)
  const [filters, setFilters] = useRecoilState(stateUserFilter)
  const filtersSerialized = useMemo(() => ModelUserFilter.toUserFilterSerialized(filters), [filters])
  const { data } = useQuery(serviceUsers.queryKeys.list(filtersSerialized), serviceUsers.listVerbose)

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
                <Link href={ModelApp.routes.user()} prefetch={false}>
                  {t('Add new user')}
                </Link>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data?.data.map((user) => (
              <Tr key={ModelUser.getId(user)}>
                <Td py="2">
                  <HStack>
                    <Avatar name={ModelUser.getNameFull(user)} size="sm" src={user.avatar} />

                    <Text>{ModelUser.getNameFull(user)}</Text>
                  </HStack>
                </Td>

                <Td>{user.role}</Td>

                <Td>{user.email}</Td>

                <Td>{user.status}</Td>

                <Td py="2">
                  <HStack justifyContent="flex-end">
                    <Link href={ModelApp.routes.user(ModelUser.getIdServer(user))} prefetch={false}>
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
