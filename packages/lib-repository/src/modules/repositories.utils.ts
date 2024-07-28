import type { DependencyRecord } from './repositories.types'

import { Repository } from './repositories.main'
import { scriptImport } from './scripts.utils'

type GlobalThis = {
  repository?: Repository
} & typeof globalThis
type Parameters = {
  dependencies?: DependencyRecord
  url: string
}

const globalThisGet = (): GlobalThis => globalThis
export const repositoryGet = async (parameters?: Parameters): Promise<Repository> => {
  const repositoryMaybe = globalThisGet().repository
  if (repositoryMaybe) {
    return repositoryMaybe
  }

  // TODO implement
  const getRepositoryFromUrl = async (url: string) => {
    const module = await scriptImport({ async: true, preload: true, url })
    return module.Repository as typeof Repository
  }

  // TODO: only load from url
  const Constructor = parameters?.url ? await getRepositoryFromUrl(parameters.url) : Repository

  const repository = await Constructor.create()
  globalThisGet().repository = repository

  return repository
}
