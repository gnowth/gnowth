import { Theme } from '../theme/theme'
import { themeStylesMake } from './theme-styles-make'

interface Props {
  value: { nested: string }
}

const theme = new Theme()

describe('themeStylesMake', () => {
  it('generates a class when string is provided', () => {
    const styles = themeStylesMake<Props>({ key: 'color: white;' })({ value: { nested: '#fff' } }, theme)

    expect(styles.key).toMatch(/^css/)
  })

  it('generates a class when function is provided', () => {
    const styles = themeStylesMake<Props>({ key: () => ({ color: 'white' }) })(
      { value: { nested: '#fff' } },
      theme,
    )

    expect(styles.key).toMatch(/^css/)
  })

  it('generates a class when function is provided and props are forwarded', () => {
    const styles = themeStylesMake<Props>({ key: (props) => ({ color: props.value.nested }) })(
      { value: { nested: '#fff' } },
      theme,
    )

    expect(styles.key).toMatch(/^css/)
  })
})
