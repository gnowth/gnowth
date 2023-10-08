import type { PropsDataReadonly, SystemPalette } from '@gnowth/lib-types'
import type { SystemType } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  Theme,
  cx,
  systemColorFromPalette,
  systemCompose,
  systemDisplay,
  systemSpace,
  systemTypography,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'
import { createElement } from 'react'

const uiTypography = systemCompose(
  systemColorFromPalette(),
  systemDisplay(),
  systemSpace(),
  systemTypography(),
)

interface ComponentProps {
  className?: string
  id?: string
}

type SystemUITypography = SystemType<typeof uiTypography>

// TODO: mediaPrint should disable elipsis
export interface VariantUITypography extends SystemUITypography {
  as?: ComponentType<ComponentProps> | string | null
  mediaPrintDisabled?: boolean
}

export interface PropsUITypography extends VariantUITypography, SystemPalette, PropsDataReadonly<ReactNode> {
  className?: string
  children?: ReactNode
  hidden?: boolean
  slot?: string
  variant?: VariantUITypography | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({ uiTypography })

const propsDefault = {
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
      id: variant.id,
    },
    variant.value,
  )
}
