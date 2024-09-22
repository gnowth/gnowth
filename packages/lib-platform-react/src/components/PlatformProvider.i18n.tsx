import { I18nInterfaceClientV1, PlatformConstant, PlatformDefinitionClient } from '@gnowth/lib-platform'
import { ComponentType, FunctionComponent, PropsWithChildren } from 'react'

import { usePlatformClient } from '../hooks/use-platform'

type I18nClientProviderProps = PropsWithChildren<{
  i18n: I18nInterfaceClientV1['client']
}>
type Props = PropsWithChildren<{
  I18nClientProvider?: ComponentType<I18nClientProviderProps>
  i18nClientDefinition?: PlatformDefinitionClient
}>
export const PlatformProviderI18n: FunctionComponent<Props> = (props) => {
  const { I18nClientProvider } = props
  const definition = I18nClientProvider
    ? (props.i18nClientDefinition ?? { name: PlatformConstant.i18nClient, type: 'client' })
    : undefined
  // DEBT(refactor): use usePlatformClientSuspense
  const { error, loading, value } = usePlatformClient<I18nInterfaceClientV1>(definition)
  const i18nClient = value?.client

  if (loading) {
    return null
  }

  if (error) {
    throw error
  }

  return I18nClientProvider && i18nClient ? (
    <I18nClientProvider i18n={i18nClient}>{props.children}</I18nClientProvider>
  ) : (
    props.children
  )
}
