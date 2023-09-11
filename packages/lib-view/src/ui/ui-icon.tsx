import type { PropsDataReadonly, SystemPalette, SystemSpace } from '@gnowth/lib-types'
import _ from 'lodash'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { Theme, cx, systemColorFromPalette, systemCompose, systemSpace } from '@gnowth/lib-theme'
import { TokenIconSize } from '@gnowth/lib-token'

interface ComponentProps {
  className?: string
  color?: string
  id?: string
  size?: string
}

export interface VariantUIIcon extends SystemSpace {
  mediaPrintDisabled?: boolean
}

// TODO: fix icon size. svg height/width supports number only
export interface PropsUIIcon extends VariantUIIcon, SystemPalette, PropsDataReadonly<string> {
  className?: string
  hidden?: boolean
  size?: string | number
  slot?: string
  variant?: VariantUIIcon | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({
  uiIcon: systemCompose<PropsUIIcon>(systemColorFromPalette(), systemSpace()),
})

const propsDefault = {
  palette: 'textPrimary',
  size: TokenIconSize.xs,
  variantNamespace: 'uiIcon',
}

export const UIIcon: React.FunctionComponent<PropsUIIcon> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)
  const Component = theme.getComponent<ComponentProps>({
    component: variant.value || undefined,
    namespace: 'icon',
  })

  if (!Component) return null

  return (
    <Component
      className={cx(
        'ui-icon',
        _.isString(variant.variant) && `ui-icon--${variant.variant}`,
        variant.className,
        styles.uiIcon,
      )}
      id={variant.id}
      size={theme.getScaleItem({ scale: 'iconsize', token: variant.size })}
    />
  )
}
