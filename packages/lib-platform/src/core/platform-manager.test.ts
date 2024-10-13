import { describe, expect, it } from '@jest/globals'

import { Platform } from './platform'
import { PlatformManager } from './platform-manager'

describe('platformManager', () => {
  it('return a platform instance', async () => {
    expect.assertions(1)

    const platform = await PlatformManager.get({ Constructor: Platform })

    expect(platform).toBeInstanceOf(Platform)
  })

  it('return the existing instance of the platform if present', async () => {
    expect.assertions(2)

    const platform1 = await PlatformManager.get({ Constructor: Platform })

    expect(platform1).toBeInstanceOf(Platform)

    const platform2 = await PlatformManager.get({ Constructor: Platform })

    expect(platform1).toBe(platform2)
  })
})
