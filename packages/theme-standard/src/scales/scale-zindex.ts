import { TokenZIndex } from '@gnowth/lib-token'

const zindexes: Record<number | string, string | undefined> = {
  [TokenZIndex.deepdive]: '-99999',
  [TokenZIndex.default]: '1',
  [TokenZIndex.docked]: '4',
  [TokenZIndex.frame]: '50',
  [TokenZIndex.sticky]: '100',
  [TokenZIndex.popup]: '5000',
  [TokenZIndex.dialog]: '6000',
  [TokenZIndex.dropdown]: '7000',
  [TokenZIndex.overlay]: '8000',
  [TokenZIndex.reminder]: '8500',
  [TokenZIndex.modal]: '9000',
  [TokenZIndex.spinner]: '9500',
  [TokenZIndex.toast]: '10000',
}

export const zindex = (token: TokenZIndex | string): string | undefined => zindexes[token]
