import type { VariantType } from '@gnowth/lib-theme'
import type { PropsUIDivider } from '@gnowth/lib-view'

export const horizontal: VariantType<PropsUIDivider> = (theme) => ({
  backgroundImage: `linear-gradient(${
    theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''
  }, ${theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat-x',
  backgroundSize: '1px 1px',
})
