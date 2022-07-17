import { Box, Button, FormLabel, Input, Skeleton, VStack } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import * as R from 'ramda'

import LayoutSection from '../components/layout-section'
import ModelMember from '../models/model-member'
import serviceMembers from '../services/service-members'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

// DEBT: find a way for not using casting on query params. at least not in the render
function FormMember() {
  const { t } = useTranslation('other')
  const id = useRouter().query.id as string // Note it can be undefined, but we are disabling useQuery if it is undefined
  const queryClient = useQueryClient()
  const handleOnMemberMutation = () => queryClient.invalidateQueries(serviceMembers.queryKeys.list({}))
  const memberMutation = useMutation(serviceMembers.save, { onSuccess: handleOnMemberMutation })
  const memberQuery = useQuery(serviceMembers.queryKeys.detail(id), serviceMembers.detail, {
    enabled: id !== undefined,
  })

  if (id === undefined) return null

  return (
    <LayoutSection>
      <Formik
        initialValues={memberQuery.data ?? ModelMember.deserialize({})}
        onSubmit={(member) => memberMutation.mutate(member)}
      >
        <VStack as={Form} alignItems="stretch" spacing="5">
          <Box>
            <FormLabel htmlFor="form-member-nameFirst">{t('First name')}</FormLabel>
            <Field as={Input} id="form-member-nameFirst" name="nameFirst" placeholder="Jane" />
          </Box>

          <Box>
            <FormLabel htmlFor="form-member-lastName">{t('Last name')}</FormLabel>
            <Field as={Input} id="form-member-lastName" name="nameLast" placeholder="Doe" />
          </Box>

          <Box>
            <FormLabel htmlFor="form-member-role">{t('Role')}</FormLabel>
            <Field as={Input} id="form-member-role" name="role" placeholder="Role" />
          </Box>

          <Box>
            <FormLabel htmlFor="form-member-email">{t('Email')}</FormLabel>
            <Field as={Input} id="form-member-email" name="email" placeholder="jane@doe.com" type="email" />
          </Box>

          <Button type="submit">{t('Submit')}</Button>
        </VStack>
      </Formik>
    </LayoutSection>
  )
}

export default R.compose(withSuspense(<Skeleton height="10" />), withErrorBoundary)(FormMember)
