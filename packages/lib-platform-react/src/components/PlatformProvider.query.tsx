import { PlatformConstant, PlatformDefinitionClient } from '@gnowth/lib-platform'
import { QueryInterfaceClientV1 } from '@gnowth/lib-platform/src/modules/queries.types'
import { ComponentType, FunctionComponent, PropsWithChildren } from 'react'

import { usePlatformClient } from '../hooks/use-platform'

type QueryClientProviderProps = PropsWithChildren<{
  client: QueryInterfaceClientV1['client']
}>
type Props = PropsWithChildren<{
  QueryClientProvider?: ComponentType<QueryClientProviderProps>
  queryClientDefinition?: PlatformDefinitionClient
}>
export const PlatformProviderQuery: FunctionComponent<Props> = (props) => {
  const { QueryClientProvider } = props
  const definition = QueryClientProvider
    ? (props.queryClientDefinition ?? {
        // module: PlatformConstant.queryModule,
        name: PlatformConstant.queryClient,
        type: 'client',
      })
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
