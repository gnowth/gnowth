import type { VariantType } from '@gnowth/lib-theme'
import type { PropsLayoutSection } from '@gnowth/lib-view'
import { TokenVariable } from '@gnowth/lib-token'

export const page: VariantType<PropsLayoutSection> = (theme) => ({
  layout: 'flex',
  layoutProps: {
    alignItems: 'stretch',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.getVariable<string>(TokenVariable.widthContent),
  },
})

export const pageRow: VariantType<PropsLayoutSection> = (theme) => ({
  layout: 'flex',
  layoutProps: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.getVariable<string>(TokenVariable.widthContent),
  },
})
