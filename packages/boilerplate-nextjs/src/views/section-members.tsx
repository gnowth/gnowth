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
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { atom, useRecoilState } from 'recoil'
import Link from 'next/link'

import InputPagination from '../components/input-pagination'
import LayoutSection from '../components/layout-section'
import ModelApp from '../models/model-app'
import ModelMember from '../models/model-member'
import ModelMemberFilter from '../models/model-member-filter'
import serviceMembers from '../services/service-members'
import withErrorBoundary from '../utils/with-error-boundary'
import { useMemo } from 'react'

export const stateMemberFilter = atom({
  key: 'membersFilter',
  default: ModelMemberFilter.deserializePaginated(),
})

// DEBT: Add message when number of results return is 0
// DEBT: Update members buttons to use icons? and only visible on hover
// DEBT: Make add new member button more visible
function SectionMembers() {
  const { t } = useTranslation()
  const [filters, setFilters] = useRecoilState(stateMemberFilter)
  const filtersSerialized = useMemo(() => ModelMemberFilter.serialize(filters), [filters])
  const { isSuccess, data } = useQuery(
    serviceMembers.queryKeys.list(filtersSerialized),
    serviceMembers.list,
    { keepPreviousData: true },
  )

  return (
    <LayoutSection>
      <Skeleton isLoaded={isSuccess}>
        <VStack spacing="10">
          <Table variant="simple">
            {!!data && !!data.meta && (
              <TableCaption>
                {t('Showing {{pageCount}} of {{totalCount}}', {
                  pageCount: data.data.length,
                  totalCount: data.meta.count,
                })}
              </TableCaption>
            )}

            <Thead>
              <Tr>
                <Th>{t('Name')}</Th>

                <Th>{t('Role')}</Th>

                <Th>{t('Email')}</Th>

                <Th>{t('Status')}</Th>

                <Th textAlign="end">
                  <Link href={ModelApp.routes.member()}>{t('Add new member')}</Link>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {data?.data.map((member) => (
                <Tr key={ModelMember.toId(member)}>
                  <Td py="2">
                    <HStack>
                      <Avatar name={ModelMember.getNameFull(member)} size="sm" src={member.avatar} />

                      <Text>{ModelMember.getNameFull(member)}</Text>
                    </HStack>
                  </Td>

                  <Td>{member.role}</Td>

                  <Td>{member.email}</Td>

                  <Td>{member.status}</Td>

                  <Td py="2">
                    <HStack justifyContent="flex-end">
                      <Link href={ModelApp.routes.member(ModelMember.toIdServer(member))}>{t('Edit')}</Link>

                      <Button size="xs">{t('Deactivate')}</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

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
      </Skeleton>
    </LayoutSection>
  )
}

export default withErrorBoundary(SectionMembers)
