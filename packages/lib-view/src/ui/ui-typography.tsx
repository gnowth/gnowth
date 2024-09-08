import type { PropsDataReadonly } from '@gnowth/lib-data'
import type { SystemType } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemColorFromPalette,
  systemCompose,
  systemDisplay,
  systemSpace,
  systemTypography,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { createElement } from 'react'
import * as R from 'remeda'

interface ComponentProps {
  className?: string
  id?: string
}
// TODO: mediaPrint should disable elipsis
export interface PropsUITypography extends SystemType<typeof uiTypography>, PropsDataReadonly<ReactNode> {
  as?: ComponentType<ComponentProps> | null | string
  children?: ReactNode
  className?: string
  hidden?: boolean
  mediaPrintDisabled?: boolean
  slot?: string
  variant?: PropsUITypography | string
  variantNamespace?: string
}

const uiTypography = systemCompose(
  systemColorFromPalette(),
  systemDisplay(),
  systemSpace(),
  systemTypography(),
)
const makeStyles = themeMakeStyles({ uiTypography })
const propsDefault: Partial<PropsUITypography> = {
  palette: 'textPrimary',
  variant: 'body1',
  variantNamespace: 'uiTypography',
}

export const UITypography: FunctionComponent<PropsUITypography> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  if (propsVariant.as === null) return <>{propsVariant.value}</>

  return createElement(
    propsVariant.as ?? 'span',
    {
      className: cx(
        'ui-typography',
        R.isString(propsVariant.variant) && `ui-typography--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiTypography,
      ),
      // should be ==> className: styles.uiTypography
      id: propsVariant.id,
    },
    propsVariant.value,
  )
}
