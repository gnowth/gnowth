import type { DependencyRecord } from './platform.types'

import { scriptImport } from '../modules/scripts.utils'
import { Platform } from './platform.main'

type GlobalThis = {
  platform?: Platform
} & typeof globalThis
type Parameters = {
  dependencies?: DependencyRecord
  url: string
}

const globalThisGet = (): GlobalThis => globalThis
export const platformGet = async (parameters?: Parameters): Promise<Platform> => {
  const platformMaybe = globalThisGet().platform
  if (platformMaybe) {
    return platformMaybe
  }

  // TODO implement
  const getPlatformFromUrl = async (url: string) => {
    const module = await scriptImport({ async: true, preload: true, url })
    return module.Platform as typeof Platform
  }

  // TODO: only load from url
  const Constructor = parameters?.url ? await getPlatformFromUrl(parameters.url) : Platform

  const platform = await Constructor.create()
  globalThisGet().platform = platform

  return platform
}

export const platformClear = (): void => {
  delete globalThisGet().platform
}
