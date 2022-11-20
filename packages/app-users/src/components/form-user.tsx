import type { FunctionComponent } from 'react'
import { LayoutSection, compose, withBoundary, withSuspense } from '@app/core'
import { Box, Button, FormLabel, Input, Skeleton, VStack } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import ModelApp from '../models/model-app'
import ModelUser from '../models/model-user'
import serviceUsers from '../services/service-users'

// DEBT: find a way for not using casting on query params. at least not in the render
const FormUser: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)
  const searchParams = useSearchParams()
  const id = searchParams.get('id') ?? ''
  const queryClient = useQueryClient()
  const handleOnUserMutation = () => queryClient.invalidateQueries(serviceUsers.queryKeys.list({}))
  const userMutation = useMutation(serviceUsers.save, { onSuccess: handleOnUserMutation })
  const userQuery = useQuery(serviceUsers.queryKeys.detail(id), serviceUsers.detail, { enabled: !!id })

  return (
    <LayoutSection>
      <Formik
        initialValues={userQuery.data ?? ModelUser.fromUserSerialized({})}
        onSubmit={(user) => userMutation.mutate(user)}
      >
        <VStack as={Form} alignItems="stretch" spacing="5">
          <Box>
            <FormLabel htmlFor="form-user-nameFirst">{t('First name')}</FormLabel>
            <Field as={Input} id="form-user-nameFirst" name="nameFirst" placeholder="Jane" />
          </Box>

          <Box>
            <FormLabel htmlFor="form-user-lastName">{t('Last name')}</FormLabel>
            <Field as={Input} id="form-user-lastName" name="nameLast" placeholder="Doe" />
          </Box>

          <Box>
            <FormLabel htmlFor="form-user-role">{t('Role')}</FormLabel>
            <Field as={Input} id="form-user-role" name="role" placeholder="Role" />
          </Box>

          <Box>
            <FormLabel htmlFor="form-user-email">{t('Email')}</FormLabel>
            <Field as={Input} id="form-user-email" name="email" placeholder="jane@doe.com" type="email" />
          </Box>

          <Button type="submit">{t('Submit')}</Button>
        </VStack>
      </Formik>
    </LayoutSection>
  )
}

const FallbackComponent: FunctionComponent = () => <Skeleton height="10" />

export default compose(withSuspense({ FallbackComponent }), withBoundary())(FormUser)
