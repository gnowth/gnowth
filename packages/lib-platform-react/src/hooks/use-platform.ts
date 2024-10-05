import {
  Platform,
  PlatformDefinitionClient,
  PlatformDefinitionProvider,
  PlatformManager,
} from '@gnowth/lib-platform'
import { DependencyList, useMemo } from 'react'
import { useAsync, useLatest } from 'react-use'
import { use } from 'react-use-polyfill'
import * as R from 'remeda'

export const usePlatform = () => {
  return useAsync(() => PlatformManager.get({ Constructor: Platform }))
}

export const usePlatformSuspense = (): Platform => {
  const promise = useMemo(() => PlatformManager.get({ Constructor: Platform }), [])
  const platform = PlatformManager.getMaybe()
  return platform ?? use(promise)
}

export const usePlatformClient = <TClient extends object>(
  definition?: PlatformDefinitionClient,
  dependencies?: DependencyList,
) => {
  return useAsync(
    async () => {
      if (!definition) {
        return undefined
      }
      const platform = await PlatformManager.get({ Constructor: Platform })
      return platform.clientGet<TClient>(definition)
    },
    R.concat([!!definition], dependencies ?? []),
  )
}

export const usePlatformClientSuspense = <TClient extends object>(
  definition: PlatformDefinitionClient,
): TClient => {
  const platform = PlatformManager.getMaybe()
  const client = platform?.clientGetMaybe<TClient>(definition)
  const getClient = async () => {
    const platform = await PlatformManager.get({ Constructor: Platform })
    return platform.clientGet<TClient>(definition)
  }
  const functionRef = useLatest(getClient)
  const promise = useMemo(() => functionRef.current(), [functionRef])
  return client ?? use(promise)
}

export const usePlatformProvider = <TProvider extends object>(
  definition?: PlatformDefinitionProvider,
  dependencies?: DependencyList,
) => {
  return useAsync(
    async () => {
      if (!definition) {
        return undefined
      }
      const platform = await PlatformManager.get({ Constructor: Platform })
      return platform.providerGet<TProvider>(definition)
    },
    R.concat([!!definition], dependencies ?? []),
  )
}

export const usePlatformProviderSuspense = <TProvider extends object>(
  definition: PlatformDefinitionProvider,
): TProvider | undefined => {
  const platform = PlatformManager.getMaybe()
  const provider = platform?.providerGetMaybe<TProvider>(definition)
  const getProvider = async () => {
    const platform = await PlatformManager.get({ Constructor: Platform })
    return platform.providerGet<TProvider>(definition)
  }
  const functionRef = useLatest(getProvider)
  const promise = useMemo(() => functionRef.current(), [functionRef])
  return provider ?? use(promise)
}
