import { describe, expect, it } from '@jest/globals'

import { themeCreateStyles } from './theme-create-styles'

describe('themeCreateStyles', () => {
  it('generates a class when string is provided', () => {
    expect.assertions(1)

    const styles = themeCreateStyles({ key: 'color: white;' })

    expect(styles.key).toMatch(/^css/)
  })

  it('generates a class when object is provided', () => {
    expect.assertions(1)

    const styles = themeCreateStyles({ key: { color: 'white' } })

    expect(styles.key).toMatch(/^css/)
  })
})
