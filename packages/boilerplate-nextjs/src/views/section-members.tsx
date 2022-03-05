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
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import Link from 'next/link'

import LayoutSection from '../components/layout-section'
import ModelApp from '../models/model-app'
import ModelMember from '../models/model-member'
import serviceMembers from '../services/service-members'
import withErrorBoundary from '../utils/with-error-boundary'

function SectionMembers() {
  const { isSuccess, data } = useQuery(
    serviceMembers.queryKeys.list({ pageSize: '5', page: '1' }),
    serviceMembers.list,
  )

  return (
    <LayoutSection>
      <Skeleton isLoaded={isSuccess}>
        <Table variant="simple">
          {!!data && !!data.meta && (
            <TableCaption>
              Showing {data.data.length} of {data.meta.count}
            </TableCaption>
          )}

          <Thead>
            <Tr>
              <Th>Name</Th>

              <Th>Role</Th>

              <Th>Email</Th>

              <Th>Status</Th>

              <Th textAlign="end">
                <Link href={ModelApp.routes.member()}>Add new member</Link>
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
                    <Link href={ModelApp.routes.member(ModelMember.toIdServer(member))}>Edit</Link>

                    <Button size="xs">Deactivate</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {!!data?.meta && 'pagination'}
      </Skeleton>
    </LayoutSection>
  )
}

export default withErrorBoundary(SectionMembers)
