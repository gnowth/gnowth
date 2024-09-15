import { Platform, PlatformDefinitionProvider, PlatformManager } from '@gnowth/lib-platform'
import { DependencyList } from 'react'
import { useAsync } from 'react-use'

import { useAsyncSuspense } from './use-async-suspense'

export const usePlatform = () => {
  return useAsync(() => PlatformManager.get({ Constructor: Platform }))
}

export const usePlatformSuspense = () => {
  return useAsyncSuspense(() => PlatformManager.get({ Constructor: Platform }))
}

export const usePlatformProvider = <TProvider extends object>(
  definition: PlatformDefinitionProvider,
  dependencies?: DependencyList,
) => {
  return useAsync(async () => {
    const platform = await PlatformManager.get({ Constructor: Platform })
    return platform.providerGet<TProvider>(definition)
  }, dependencies)
}

export const usePlatformProviderSuspense = <TProvider extends object>(
  definition: PlatformDefinitionProvider,
  dependencies?: DependencyList,
) => {
  return useAsyncSuspense(async () => {
    const platform = await PlatformManager.get({ Constructor: Platform })
    return platform.providerGet<TProvider>(definition)
  }, dependencies)
}
