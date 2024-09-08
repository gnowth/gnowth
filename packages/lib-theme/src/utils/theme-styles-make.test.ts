import { Theme } from '../theme/theme'
import { themeStylesMake } from './theme-styles-make'

describe('themeStylesMake', () => {
  const theme = new Theme()
  const props = { value: { nested: '#fff' } } as const

  it('generates a class when string is provided', () => {
    const styles = themeStylesMake({ key: 'color: white;' })(props, theme)
    expect(styles.key).toMatch(/^css/)
  })

  it('generates a class when object is provided', () => {
    const styles = themeStylesMake({ key: { color: 'white' } })(props, theme)
    expect(styles.key).toMatch(/^css/)
  })

  it('generates a class when function is provided', () => {
    const styles = themeStylesMake({ key: () => ({ color: 'white' }) })(props, theme)
    expect(styles.key).toMatch(/^css/)
  })

  it('generates a class when function is provided and props are forwarded', () => {
    type Props = { value: { nested: string } }
    const styles = themeStylesMake({ key: (props: Props) => ({ color: props.value.nested }) })(props, theme)
    expect(styles.key).toMatch(/^css/)
  })
})
