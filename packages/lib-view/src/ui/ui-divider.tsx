import type { SystemImage, SystemSpace, SystemTextAlign } from '@gnowth/lib-types'
import _ from 'lodash'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { Theme, cx, systemCompose, systemImage, systemSpace, systemTextAlign } from '@gnowth/lib-theme'

type SystemUIDivider = SystemImage & SystemSpace & SystemTextAlign

export interface VariantUIDivider extends SystemUIDivider {
  as?: string
}

export interface PropsUIDivider extends VariantUIDivider {
  children: React.ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: VariantUIDivider | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({
  uiDivider: systemCompose<PropsUIDivider>(systemImage(), systemSpace(), systemTextAlign()),
})

const propsDefault = {
  textAlign: 'center',
  variant: 'horizontal',
  variantNamespace: 'uiDivider',
}

const UIDivider: React.FunctionComponent<PropsUIDivider> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  return (
    <div
      className={cx(
        'ui-divider',
        _.isString(variant.variant) && `ui-divider--${variant.variant}`,
        variant.className,
        styles.uiDivider,
      )}
      id={variant.id}
    >
      {props.children}
    </div>
  )
}

export default UIDivider
