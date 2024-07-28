import type { VariantType } from '@gnowth/lib-theme'
import type { PropsLayoutSection } from '@gnowth/lib-view'

import { TokenVariable } from '@gnowth/lib-theme'

export const page: VariantType<PropsLayoutSection> = (props) => ({
  layout: 'flex',
  layoutProps: {
    alignItems: 'stretch',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: props.theme.getVariable<string>(TokenVariable.widthContent),
  },
})

export const pageRow: VariantType<PropsLayoutSection> = (props) => ({
  layout: 'flex',
  layoutProps: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: props.theme.getVariable<string>(TokenVariable.widthContent),
  },
})
