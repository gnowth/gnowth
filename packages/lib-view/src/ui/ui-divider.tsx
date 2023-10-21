import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemCompose,
  systemImage,
  systemSpace,
  systemTextAlign,
  themeStylesMake,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'

export interface PropsUIDivider extends SystemType<typeof uiDivider> {
  as?: string
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsUIDivider | string
  variantNamespace?: string
}

const uiDivider = systemCompose(systemImage(), systemSpace(), systemTextAlign())
const makeStyles = themeStylesMake({ uiDivider })
const propsDefault: Partial<PropsUIDivider> = {
  textAlign: 'center',
  variant: 'horizontal',
  variantNamespace: 'uiDivider',
}

export const UIDivider: FunctionComponent<PropsUIDivider> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  return (
    <div
      className={cx(
        'ui-divider',
        guardString(variant.variant) && `ui-divider--${variant.variant}`,
        variant.className,
        styles.uiDivider,
      )}
      id={variant.id}
    >
      {props.children}
    </div>
  )
}
