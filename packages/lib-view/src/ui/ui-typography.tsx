import { useAppTheme } from '@gnowth/lib-application'
import { PropsDataReadonly } from '@gnowth/lib-data'
import {
  SystemType,
  cx,
  systemColorFromPalette,
  systemCompose,
  systemDisplay,
  systemSpace,
  systemTypography,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { ComponentType, FunctionComponent, ReactNode, createElement } from 'react'
import * as R from 'remeda'

type ComponentProps = {
  className?: string
  'data-testid'?: string
  id?: string
}
// TODO: mediaPrint should disable elipsis
export type PropsUITypography = {
  as?: ComponentType<ComponentProps> | null | string
  children?: ReactNode
  className?: string
  hidden?: boolean
  mediaPrintDisabled?: boolean
  slot?: string
  variant?: PropsUITypography | string
  variantNamespace?: string
} & PropsDataReadonly<ReactNode> &
  SystemType<typeof uiTypography>

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
      'data-testid': 'view-ui-typography',
      // should be ==> className: styles.uiTypography
      id: propsVariant.id,
    },
    propsVariant.value,
  )
}
