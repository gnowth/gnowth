import type { DependencyRecord } from './dependencies'
import { Repository } from './repositories.main'
import { ScriptMain } from './scripts.main'

type GlobalThis = typeof globalThis & {
  repository?: Repository
}
type Parameters = {
  dependencies?: DependencyRecord
  url: string
}

const globalThisGet = (): GlobalThis => globalThis

export const repositoryGet = (): Repository | undefined => globalThisGet().repository

export const repositoryGetAsync = async (parameters?: Parameters): Promise<Repository> => {
  const repositoryMaybe = repositoryGet()

  if (repositoryMaybe) {
    return repositoryMaybe
  }

  // TODO implement
  const getRepositoryFromUrl = async (url: string) => {
    const script = new ScriptMain()
    await script.inject({ async: true, preload: true, url })
    const Constructor = await import(url)
    return Constructor as { new (): Repository }
  }

  // TODO: only load from url
  const Constructor = parameters?.url ? await getRepositoryFromUrl(parameters.url) : Repository

  const repository = new Constructor(parameters)
  await repository.initialise()

  const globalThis = globalThisGet()
  globalThis.repository = repository

  return repository
}
