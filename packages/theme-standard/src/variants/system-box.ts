import type { SystemBox, Theme } from '@gnowth/lib-types'

export const button: SystemBox = {}

export const float: SystemBox = {
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
}

export const input = (theme: Theme): SystemBox => ({
  border: `1px solid ${theme.getPaletteColor({ palette: 'text', paletteWeight: '300' }) ?? ''}`,
  borderColor: {
    '&:hover': theme.getPaletteColor({ palette: 'text', paletteWeight: '700' }) ?? '',
    '&:focus': theme.getPaletteColor({ palette: 'secondary' }) ?? '',
  },
  borderRadius: '4px',
  boxShadow: {
    '&:focus': `0 0 0 1px ${theme.getPaletteColor({ palette: 'secondary' }) ?? ''}`,
  },
  outline: { '&:focus': 'none' },
})

export const separator = (theme: Theme): SystemBox => ({
  borderTop: `1px solid ${theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''}`,
})