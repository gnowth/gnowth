import Theme from './theme'

interface Props {
  value: { nested: string }
}

const theme = new Theme({})

describe('Theme', () => {
  describe('static makeStyles', () => {
    it('generates a class when string is provided', () => {
      const styles = Theme.makeStyles<Props>({ key: 'color: white;' })({ value: { nested: '#fff' } }, theme)

      expect(styles.key).toMatch(/^css/)
    })

    it('generates a class when function is provided', () => {
      const styles = Theme.makeStyles<Props>({ key: () => ({ color: 'white' }) })(
        { value: { nested: '#fff' } },
        theme,
      )

      expect(styles.key).toMatch(/^css/)
    })

    it('generates a class when function is provided and props are forwarded', () => {
      const styles = Theme.makeStyles<Props>({ key: (props) => ({ color: props.value.nested }) })(
        { value: { nested: '#fff' } },
        theme,
      )

      expect(styles.key).toMatch(/^css/)
    })
  })
})
