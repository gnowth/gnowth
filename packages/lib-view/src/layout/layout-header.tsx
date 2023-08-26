import type { SystemSpace, SystemZIndex } from '@gnowth/lib-types'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { Theme, cx, systemCompose, systemSpace, systemZIndex } from '@gnowth/lib-theme'
import { TokenZIndex } from '@gnowth/lib-token'

type SystemLayoutHeader = SystemZIndex & SystemSpace

export interface VariantLayoutHeader extends SystemLayoutHeader {
  as?: string
}

export interface PropsLayoutHeader extends VariantLayoutHeader {
  children: React.ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
}

const makeStyles = Theme.makeStyles({
  layoutHeader: systemCompose<PropsLayoutHeader>(systemSpace(), systemZIndex()),
})

const propsDefault = {
  zIndex: TokenZIndex.frame,
}

const LayoutHeader: React.FunctionComponent<PropsLayoutHeader> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  return (
    <header className={cx('layout-header', variant.className, styles.layoutHeader)} id={variant.id}>
      {props.children}
    </header>
  )
}

export default LayoutHeader
