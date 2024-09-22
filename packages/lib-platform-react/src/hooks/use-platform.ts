import {
  Platform,
  PlatformDefinitionClient,
  PlatformDefinitionProvider,
  PlatformManager,
} from '@gnowth/lib-platform'
import { useAsyncSuspense } from '@gnowth/lib-utils-react'
import { DependencyList } from 'react'
import { useAsync } from 'react-use'
import * as R from 'remeda'

export const usePlatform = () => {
  return useAsync(() => PlatformManager.get({ Constructor: Platform }))
}

export const usePlatformSuspense = (): Platform => {
  return useAsyncSuspense(() => PlatformManager.get({ Constructor: Platform }))
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
  definition?: PlatformDefinitionClient,
  dependencies?: DependencyList,
): TClient | undefined => {
  return useAsyncSuspense(
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
  definition?: PlatformDefinitionProvider,
  dependencies?: DependencyList,
): TProvider | undefined => {
  return useAsyncSuspense(
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
