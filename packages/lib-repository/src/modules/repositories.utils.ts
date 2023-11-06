import { Repository } from './repositories.main'
import { Script } from './scripts.main'

type GlobalThis = typeof globalThis & {
  repository?: Repository
}
type Parameters = {
  url: string
}

const globalThisGet = (): GlobalThis => globalThis

export const repositoryGet = (): Repository | undefined => globalThisGet().repository

// TODO: remove after everywhere is migrated to repository properly
export const repositoryGetSync = (): Repository | undefined => {
  const repositoryMaybe = repositoryGet()

  if (repositoryMaybe) {
    return repositoryMaybe
  }

  const repository = new Repository()

  const globalThis = globalThisGet()
  globalThis.repository = repository

  return repository
}

// TODO implement properly
export const repositoryGetAsync = async (parameters: Parameters): Promise<Repository> => {
  const repositoryMaybe = repositoryGet()

  if (repositoryMaybe) {
    return repositoryMaybe
  }

  const script = new Script()
  await script.inject({ async: true, preload: true, url: parameters.url })
  const Module = await import(parameters.url)

  const repository = new Module() as Repository
  await repository.initialise()

  const globalThis = globalThisGet()
  globalThis.repository = repository

  return repository
}

export const repositoryGetOrCreate = async (): Promise<Repository> => {
  const repositoryMaybe = repositoryGet()

  if (repositoryMaybe) {
    return repositoryMaybe
  }

  const repository = new Repository()
  await repository.initialise()

  const globalThis = globalThisGet()
  globalThis.repository = repository

  return repository
}
