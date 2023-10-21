import type { FunctionComponent, ReactNode } from 'react'
import type { SystemType } from '@gnowth/lib-theme'
import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemCompose, systemSpace, systemZIndex, themeStylesMake } from '@gnowth/lib-theme'

export interface PropsLayoutHeader extends SystemType<typeof layoutHeader> {
  as?: string
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutHeader | string
}

const layoutHeader = systemCompose(systemSpace(), systemZIndex())
const makeStyles = themeStylesMake({ layoutHeader })
const propsDefault: Partial<PropsLayoutHeader> = {
  zIndex: 'frame',
}

export const LayoutHeader: FunctionComponent<PropsLayoutHeader> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <header className={cx('layout-header', propsVariant.className, styles.layoutHeader)} id={propsVariant.id}>
      {props.children}
    </header>
  )
}
