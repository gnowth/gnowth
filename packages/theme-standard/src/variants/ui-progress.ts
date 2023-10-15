import type { VariantType } from '@gnowth/lib-theme'
import type { VariantUIProgress } from '@gnowth/lib-view'
import { TokenIconSize, TokenSpace } from '@gnowth/lib-token'

export const page: VariantType<VariantUIProgress> = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: TokenSpace.xl,
  size: TokenIconSize.xl,
}
