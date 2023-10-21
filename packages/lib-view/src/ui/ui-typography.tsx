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
  themeStylesMake,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'
import { createElement } from 'react'

interface ComponentProps {
  className?: string
  id?: string
}

// TODO: mediaPrint should disable elipsis
export interface PropsUITypography extends SystemType<typeof uiTypography>, PropsDataReadonly<ReactNode> {
  as?: ComponentType<ComponentProps> | string | null
  className?: string
  children?: ReactNode
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
const makeStyles = themeStylesMake({ uiTypography })
const propsDefault: Partial<PropsUITypography> = {
  palette: 'textPrimary',
  variant: 'body1',
  variantNamespace: 'uiTypography',
}

export const UITypography: FunctionComponent<PropsUITypography> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  if (variant.as === null) return <>{variant.value}</>

  return createElement(
    variant.as ?? 'span',
    {
      className: cx(
        'ui-typography',
        guardString(variant.variant) && `ui-typography--${variant.variant}`,
        variant.className,
        styles.uiTypography,
      ),
      // should be ==> className: styles.uiTypography
      id: variant.id,
    },
    variant.value,
  )
}
