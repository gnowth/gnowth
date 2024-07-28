import { repositoryGet, Repository } from './repositories.exports'

describe('repositoryGet', () => {
  it('return a repository instance', async () => {
    expect.assertions(1)
    const repository = await repositoryGet()
    expect(repository).toBeInstanceOf(Repository)
  })

  it('return the existing instance of the repository if present', async () => {
    expect.assertions(2)
    const repository1 = await repositoryGet()
    expect(repository1).toBeInstanceOf(Repository)
    const repository2 = await repositoryGet()
    expect(repository1).toBe(repository2)
  })
})
