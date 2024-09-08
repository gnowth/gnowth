import type { VariantType } from '@gnowth/lib-theme'
import type { PropsLayoutSection } from '@gnowth/lib-view'

import { ThemeVariable } from '@gnowth/lib-theme'

export const page: VariantType<PropsLayoutSection> = (props) => ({
  layout: 'flex',
  layoutProps: {
    alignItems: 'stretch',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: props.theme.getVariable<string>(ThemeVariable.widthContent),
  },
})
