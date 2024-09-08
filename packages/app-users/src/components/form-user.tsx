import type { FunctionComponent } from 'react'

import { DataConnect, DataSource, DataTrigger, LayoutSection, UISkeleton } from '@gnowth/lib-react'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValue = useMemo(() => userQuery.data?.data ?? dependencies.userModel.fromData({}), [])

  return (
    <LayoutSection variant="container">
      <DataSource mode="uncontrolled" onSubmit={(user) => userMutation.mutate(user)} value={initialValue}>
        <DataConnect
          component="text"
          id="form-user-nameFirst"
          labelValue={t('First name')}
          name="nameFirst"
          placeholder={t('Jane')}
        />

        <DataConnect
          component="text"
          id="form-user-nameLast"
          labelValue={t('Last name')}
          name="nameLast"
          placeholder={t('Doe')}
        />

        <DataConnect
          component="text"
          id="form-user-role"
          labelValue={t('Role')}
          name="role"
          placeholder={t('Role')}
        />

        <DataConnect
          component="text"
          id="form-user-email"
          labelValue={t('Email')}
          name="emaili"
          placeholder={t('jane@doe.com')}
        />

        <DataTrigger componentValue={t('Submit')} submit />
      </DataSource>
    </LayoutSection>
  )
}

export const FormUser = withAugmented({ LoadingComponent: () => <UISkeleton height="xxxl" /> })(
  FormUserComponent,
)
