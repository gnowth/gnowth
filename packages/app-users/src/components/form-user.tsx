import type { FunctionComponent } from 'react'

import { Box, Button, FormLabel, Input, Skeleton } from '@chakra-ui/react'
import { LayoutStack } from '@gnowth/lib-react'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { dependencies } from '../dependencies'
import { LayoutSection } from './layout-section'
import { stateUserFilter } from './section-users'
import { withAugmented } from './with-augmented'

// DEBT: find a way for not using casting on query params. at least not in the render
const FormUserComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)
  const searchParams = useSearchParams()
  const id = searchParams?.get('id') ?? ''
  const [filters] = useRecoilState(stateUserFilter)
  const queryClient = useQueryClient()
  const handleOnUserMutation = () =>
    queryClient.invalidateQueries({
      queryKey: dependencies.userService.queryKeys.list(dependencies.userFilterModel.toParams(filters)),
    })
  const userMutation = useMutation(
    dependencies.userService.mutateOptions({ onSuccess: handleOnUserMutation }),
  )
  const userQuery = useSuspenseQuery(dependencies.userService.queryOptions({ id }))

  return (
    <LayoutSection>
      <Formik
        initialValues={userQuery.data?.data ?? dependencies.userModel.fromData({})}
        onSubmit={(user) => userMutation.mutate(user)}
      >
        <LayoutStack as={Form}>
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
        </LayoutStack>
      </Formik>
    </LayoutSection>
  )
}

export const FormUser = withAugmented({ LoadingComponent: () => <Skeleton height="10" /> })(FormUserComponent)
