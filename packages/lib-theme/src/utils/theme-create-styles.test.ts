import { themeCreateStyles } from './theme-create-styles'

describe('themeCreateStyles', () => {
  it('generates a class when string is provided', () => {
    const styles = themeCreateStyles({ key: 'color: white;' })
    expect(styles.key).toMatch(/^css/)
  })

  it('generates a class when object is provided', () => {
    const styles = themeCreateStyles({ key: { color: 'white' } })
    expect(styles.key).toMatch(/^css/)
  })
})
