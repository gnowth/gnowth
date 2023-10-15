import type { VariantType } from '@gnowth/lib-theme'
import type { VariantLayoutSection } from '@gnowth/lib-view'
import { TokenVariable } from '@gnowth/lib-token'

export const page: VariantType<VariantLayoutSection> = (theme) => ({
  layout: 'flex',
  layoutProps: {
    alignItems: 'stretch',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.getVariable<string>(TokenVariable.widthContent),
  },
})

export const pageRow: VariantType<VariantLayoutSection> = (theme) => ({
  layout: 'flex',
  layoutProps: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.getVariable<string>(TokenVariable.widthContent),
  },
})
