import { PlatformDefinitionClient, PlatformDependency, QueryInterfaceClientV1 } from '@gnowth/lib-platform'
import { ComponentType, FunctionComponent, PropsWithChildren } from 'react'

import { usePlatformClient } from '../hooks/use-platform'

type Props = PropsWithChildren<{
  queryClientDefinition?: PlatformDefinitionClient
  QueryClientProvider?: ComponentType<QueryClientProviderProps>
}>
type QueryClientProviderProps = PropsWithChildren<{
  client: QueryInterfaceClientV1['client']
}>
export const PlatformProviderQuery: FunctionComponent<Props> = (props) => {
  const { QueryClientProvider } = props
  const definition = QueryClientProvider
    ? (props.queryClientDefinition ?? { name: PlatformDependency.queryClient })
    : undefined
  // DEBT(refactor): use usePlatformClientSuspense
  const { error, loading, value } = usePlatformClient<QueryInterfaceClientV1>(definition)
  const queryClient = value?.client

  if (loading) {
    return null
  }

  if (error) {
    throw error
  }

  return QueryClientProvider && queryClient ? (
    <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
  ) : (
    props.children
  )
}
