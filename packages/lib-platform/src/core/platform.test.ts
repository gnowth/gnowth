import { Platform, platformGet } from './platform'

describe('platformGet', () => {
  it('return a platform instance', async () => {
    expect.assertions(1)
    const platform = await platformGet()
    expect(platform).toBeInstanceOf(Platform)
  })

  it('return the existing instance of the platform if present', async () => {
    expect.assertions(2)
    const platform1 = await platformGet()
    expect(platform1).toBeInstanceOf(Platform)
    const platform2 = await platformGet()
    expect(platform1).toBe(platform2)
  })
})
