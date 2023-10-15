import type { FunctionComponent, ReactNode } from 'react'
import type { SystemType } from '@gnowth/lib-theme'
import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemCompose, systemSpace, systemZIndex, themeStylesMake } from '@gnowth/lib-theme'

const layoutHeader = systemCompose(systemSpace(), systemZIndex())

export interface VariantLayoutHeader extends SystemType<typeof layoutHeader> {
  as?: string
}

export interface PropsLayoutHeader extends VariantLayoutHeader {
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
}

const makeStyles = themeStylesMake({ layoutHeader })

const propsDefault: Partial<PropsLayoutHeader> = {
  zIndex: 'frame',
}

export const LayoutHeader: FunctionComponent<PropsLayoutHeader> = (props) => {
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
