import type { ScaleType, TokenZIndex } from '@gnowth/lib-theme'

export const zindex = {
  deepdive: '-99999',
  default: '1',
  dialog: '6000',
  docked: '4',
  dropdown: '7000',
  frame: '50',
  modal: '9000',
  overlay: '8000',
  popup: '5000',
  reminder: '8500',
  spinner: '9500',
  sticky: '100',
  toast: '10000',
} satisfies ScaleType<TokenZIndex>
