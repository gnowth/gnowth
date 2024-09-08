import type { SystemType, VariantType, systemBox } from '@gnowth/lib-theme'

type SystemBox = SystemType<ReturnType<typeof systemBox>>

export const button: VariantType<SystemBox> = {}

export const float: VariantType<SystemBox> = {
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
}

export const input: VariantType<SystemBox> = (props) => ({
  border: `1px solid ${props.theme.getPaletteColor({ palette: 'text', paletteWeight: '300' }) ?? ''}`,
  borderColor: {
    '&:focus': props.theme.getPaletteColor({ palette: 'secondary' }) ?? '',
    '&:hover': props.theme.getPaletteColor({ palette: 'text', paletteWeight: '700' }) ?? '',
  },
  borderRadius: '4px',
  boxShadow: {
    '&:focus': `0 0 0 1px ${props.theme.getPaletteColor({ palette: 'secondary' }) ?? ''}`,
  },
  outline: { '&:focus': 'none' },
})

export const separator: VariantType<SystemBox> = (props) => ({
  borderTop: `1px solid ${props.theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''}`,
})

// export function input(props: Props): CSSProperties {
//   return {
//     backgroundColor: 'hsl(0, 0%, 98%)',
//     border: `1px solid ${props.theme.getColor({ name: 'secondary' })}`,
//     borderRadius: '4px',

//     ':focus': {
//       backgroundColor: 'white',
//       borderColor: '#2684ff',
//       outline: 'none',
//       boxShadow: '0 0 0 1px #2684ff',
//     },
//   };
// }
