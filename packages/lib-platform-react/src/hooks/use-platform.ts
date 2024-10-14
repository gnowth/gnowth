import {
  Platform,
  PlatformDefinition,
  PlatformDefinitionClient,
  PlatformDefinitionController,
  PlatformDefinitionProvider,
  PlatformManager,
} from '@gnowth/lib-platform'
import { DependencyList, useMemo } from 'react'
import { useAsync } from 'react-use'
import { use } from 'react-use-polyfill'
import * as R from 'remeda'

export const usePlatform = () => {
  return useAsync(() => PlatformManager.staticGet())
}

export const usePlatformSuspense = (): Platform => {
  const promise = useMemo(() => PlatformManager.staticGet(), [])
  const platform = PlatformManager.getMaybe()
  return platform ?? use(promise)
}

export const usePlatformClient = <TClient extends object>(
  definition?: Omit<PlatformDefinitionClient, 'type'>,
  dependencies?: DependencyList,
) => {
  return useAsync(
    async () => {
      if (definition) {
        return PlatformManager.staticGetClient<TClient>(definition)
      }
    },
    R.concat([!!definition], dependencies ?? []),
  )
}

export const usePlatformClientSuspense = <TClient extends object>(
  definition: Omit<PlatformDefinitionClient, 'type'>,
): TClient => {
  const platform = PlatformManager.getMaybe()
  const client = platform?.clientGetMaybe<TClient>(definition)
  const promise = useMemo(() => PlatformManager.staticGetClient<TClient>(definition), [])
  return client ?? use(promise)
}

export const usePlatformController = <TController extends object>(
  definition?: Omit<PlatformDefinitionController, 'type'>,
  dependencies?: DependencyList,
) => {
  return useAsync(
    async () => {
      if (definition) {
        return PlatformManager.staticGetController<TController>(definition)
      }
    },
    R.concat([!!definition], dependencies ?? []),
  )
}

export const usePlatformControllerSuspense = <TController extends object>(
  definition: Omit<PlatformDefinitionController, 'type'>,
): TController => {
  const platform = PlatformManager.getMaybe()
  const controller = platform?.controllerGetMaybe<TController>(definition)

  const promise = useMemo(() => PlatformManager.staticGetController<TController>(definition), [])
  return controller ?? use(promise)
}

export const usePlatformDependencies = (
  definitions: PlatformDefinition[] = [],
  dependencies?: DependencyList,
) => {
  return useAsync(
    () => PlatformManager.staticMountDependencies(definitions),
    R.concat([!!definitions], dependencies ?? []),
  )
}

export const usePlatformProvider = <TProvider extends object>(
  definition: Omit<PlatformDefinitionProvider, 'type'>,
  dependencies?: DependencyList,
) => {
  return useAsync(
    async () => {
      if (definition) {
        return PlatformManager.staticGetProvider<TProvider>(definition)
      }
    },
    R.concat([!!definition], dependencies ?? []),
  )
}

export const usePlatformProviderSuspense = <TProvider extends object>(
  definition: Omit<PlatformDefinitionProvider, 'type'>,
): TProvider => {
  const platform = PlatformManager.getMaybe()
  const provider = platform?.providerGetMaybe<TProvider>(definition)

  const promise = useMemo(() => PlatformManager.staticGetProvider<TProvider>(definition), [])
  return provider ?? use(promise)
}
