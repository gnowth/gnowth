import type { VariantType } from '@gnowth/lib-theme'
import type { VariantInputText } from '@gnowth/lib-view'

export const input: VariantType<VariantInputText> = {
  paddingBottom: '11px',
  paddingLeft: 'sm',
  paddingRight: 'sm',
  paddingTop: '11px',
}

export const input2: VariantType<VariantInputText> = {
  paddingBottom: 'xxs',
  paddingLeft: 'xs',
  paddingRight: 'xs',
  paddingTop: 'xxs',
}

// export function input(props: Props): CSSProperties {
//   return {
//     backgroundColor: 'hsl(0, 0%, 98%)',
//     border: `1px solid ${props.theme.getColor({ name: 'secondary' })}`,
//     borderRadius: '4px',
//     padding: '9px',
//     width: '100%',

//     ':focus': {
//       backgroundColor: 'white',
//       borderColor: '#2684ff',
//       outline: 'none',
//       boxShadow: '0 0 0 1px #2684ff',
//     },
//   };
// }
