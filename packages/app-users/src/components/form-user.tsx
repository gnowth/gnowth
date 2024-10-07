import {
  DataConnect,
  DataSource,
  DataTrigger,
  LayoutSection,
  UISkeleton,
  usePlatformProviderSuspense,
} from '@gnowth/lib-react'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { AppUserConstant, AppUserDependency } from '../modules/app-users'
import { UserFilterModel } from '../modules/user-filters'
import { UserService } from '../modules/users'
import { stateUserFilter } from './section-users'
import { withAugmented } from './with-augmented'

// DEBT: find a way for not using casting on query params. at least not in the render
const FormUserComponent: FunctionComponent = () => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  const searchParams = useSearchParams()
  const id = searchParams?.get('id') ?? ''
  const [filters] = useRecoilState(stateUserFilter)
  const userService = usePlatformProviderSuspense<UserService>({
    name: AppUserDependency.userService,
  })
  const userFilterModel = usePlatformProviderSuspense<UserFilterModel>({
    name: AppUserDependency.userFilterModel,
  })
  const queryClient = useQueryClient()
  const handleOnUserMutation = () =>
    queryClient.invalidateQueries({
      queryKey: userService.queryKeys.list(userFilterModel.toParams(filters)),
    })
  const userSave = useMutation(userService.saveOptions({ onSuccess: handleOnUserMutation }))
  const userDetail = useSuspenseQuery(userService.detailOptions({ id }))

  return (
    <LayoutSection variant="container">
      <DataSource mode="uncontrolled" onSubmit={(user) => userSave.mutate(user)} value={userDetail.data.data}>
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
