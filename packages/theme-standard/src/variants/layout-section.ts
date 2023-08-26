import type { Theme } from '@gnowth/lib-types'
import type { VariantLayoutSection } from '@gnowth/lib-view'
import { TokenVariable } from '@gnowth/lib-token'

export const page = (theme: Theme): VariantLayoutSection => ({
  layout: 'flex',
  layoutProps: {
    alignItems: 'stretch',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.getVariable(TokenVariable.widthContent),
  },
})

export const pageRow = (theme: Theme): VariantLayoutSection => ({
  layout: 'flex',
  layoutProps: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.getVariable(TokenVariable.widthContent),
  },
})
