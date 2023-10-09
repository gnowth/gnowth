import type { Theme } from '@gnowth/lib-theme'
import type { VariantUIDivider } from '@gnowth/lib-view'

export const horizontal = (theme: Theme): VariantUIDivider => ({
  backgroundImage: `linear-gradient(${
    theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''
  }, ${theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat-x',
  backgroundSize: '1px 1px',
})
