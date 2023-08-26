import type {
  PropsDataReadonly,
  SystemDisplay,
  SystemPalette,
  SystemSpace,
  SystemTypography,
} from '@gnowth/lib-types'
import type { ReactNode } from 'react'
import _ from 'lodash'
import React from 'react'
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

interface ComponentProps {
  className?: string
  id?: string
}

type SystemUITypography = SystemDisplay & SystemSpace & SystemTypography

// TODO: mediaPrint should disable elipsis
export interface VariantUITypography extends SystemUITypography {
  as?: React.ComponentType<ComponentProps> | string | null
  mediaPrintDisabled?: boolean
}

export interface PropsUITypography
  extends VariantUITypography,
    SystemPalette,
    PropsDataReadonly<React.ReactNode> {
  className?: string
  children?: ReactNode
  hidden?: boolean
  slot?: string
  variant?: VariantUITypography | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({
  uiTypography: systemCompose<PropsUITypography>(
    systemColorFromPalette(),
    systemDisplay(),
    systemSpace(),
    systemTypography(),
  ),
})

const propsDefault = {
  palette: 'textPrimary',
  variant: 'body1',
  variantNamespace: 'uiTypography',
}

const UITypography: React.FunctionComponent<PropsUITypography> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  if (variant.as === null) return <>{variant.value}</>

  return React.createElement(
    variant.as ?? 'span',
    {
      className: cx(
        'ui-typography',
        _.isString(variant.variant) && `ui-typography--${variant.variant}`,
        variant.className,
        styles.uiTypography,
      ),
      id: variant.id,
    },
    variant.value,
  )
}

export default UITypography
