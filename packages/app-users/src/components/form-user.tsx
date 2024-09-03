import type { FunctionComponent } from 'react'

import { FormLabel, Input, Skeleton } from '@chakra-ui/react'
import { LayoutSection, LayoutStack, UIBox, UIButton, UITypography } from '@gnowth/lib-react'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { dependencies } from '../dependencies'
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
    <LayoutSection variant="container">
      <Formik
        initialValues={userQuery.data?.data ?? dependencies.userModel.fromData({})}
        onSubmit={(user) => userMutation.mutate(user)}
      >
        <LayoutStack as={Form}>
          <UIBox>
            <FormLabel htmlFor="form-user-nameFirst">
              <UITypography value={t('First name')} variant="label" />
            </FormLabel>
            <Field as={Input} id="form-user-nameFirst" name="nameFirst" placeholder="Jane" />
          </UIBox>

          <UIBox>
            <FormLabel htmlFor="form-user-lastName">
              <UITypography value={t('Last name')} variant="label" />
            </FormLabel>
            <Field as={Input} id="form-user-lastName" name="nameLast" placeholder="Doe" />
          </UIBox>

          <UIBox>
            <FormLabel htmlFor="form-user-role">
              <UITypography value={t('Role')} variant="label" />
            </FormLabel>
            <Field as={Input} id="form-user-role" name="role" placeholder="Role" />
          </UIBox>

          <UIBox>
            <FormLabel htmlFor="form-user-email">
              <UITypography value={t('Email')} variant="label" />
            </FormLabel>
            <Field as={Input} id="form-user-email" name="email" placeholder="jane@doe.com" type="email" />
          </UIBox>

          <UIButton textValue={t('Submit')} type="submit" />
        </LayoutStack>
      </Formik>
    </LayoutSection>
  )
}

export const FormUser = withAugmented({ LoadingComponent: () => <Skeleton height="10" /> })(FormUserComponent)
