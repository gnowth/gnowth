import type { VariantType } from '@gnowth/lib-theme'
import type { PropsUIDivider } from '@gnowth/lib-view'

export const horizontal: VariantType<PropsUIDivider> = (props) => ({
  backgroundImage: `linear-gradient(${
    props.theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''
  }, ${props.theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat-x',
  backgroundSize: '1px 1px',
})
