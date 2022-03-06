import { Box, Button, FormLabel, Input, Skeleton, VStack } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'

import LayoutSection from '../components/layout-section'
import ModelMember from '../models/model-member'
import serviceMembers from '../services/service-members'
import withErrorBoundary from '../utils/with-error-boundary'

function FormMember() {
  const id = useRouter().query.id as string // Note it can be undefined, but we are disabling useQuery if it is undefined
  const queryClient = useQueryClient()
  const { mutate } = useMutation(serviceMembers.save, {
    onSuccess: () => queryClient.invalidateQueries(serviceMembers.queryKeys.list({})),
  })
  const { isSuccess, data: member } = useQuery(serviceMembers.queryKeys.detail(id), serviceMembers.detail, {
    enabled: id !== undefined,
  })

  return (
    <LayoutSection>
      <Skeleton isLoaded={isSuccess || id === undefined}>
        <Formik initialValues={member ?? ModelMember.deserialize({})} onSubmit={(member) => mutate(member)}>
          <VStack as={Form} alignItems="stretch" spacing="5">
            <Box>
              <FormLabel htmlFor="form-member-nameFirst">First name</FormLabel>
              <Field as={Input} id="form-member-nameFirst" name="nameFirst" placeholder="Jane" />
            </Box>

            <Box>
              <FormLabel htmlFor="form-member-lastName">Last name</FormLabel>
              <Field as={Input} id="form-member-lastName" name="nameLast" placeholder="Doe" />
            </Box>

            <Box>
              <FormLabel htmlFor="form-member-role">Role</FormLabel>
              <Field as={Input} id="form-member-role" name="role" placeholder="Role" />
            </Box>

            <Box>
              <FormLabel htmlFor="form-member-email">Email</FormLabel>
              <Field as={Input} id="form-member-email" name="email" placeholder="jane@doe.com" type="email" />
            </Box>

            <Button type="submit">Submit</Button>
          </VStack>
        </Formik>
      </Skeleton>
    </LayoutSection>
  )
}

export default withErrorBoundary(FormMember)
