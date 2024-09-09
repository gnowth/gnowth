import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemCompose, systemPlace, systemSpace, themeMakeStyles } from '@gnowth/lib-theme'

export interface PropsLayoutAppHeader extends SystemType<typeof layoutAppHeader> {
  as?: string
  children: ReactNode
  className?: string
  'data-testid'?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutAppHeader | string
}

const layoutAppHeader = systemCompose(systemPlace(), systemSpace())
const makeStyles = themeMakeStyles({ layoutAppHeader })
const propsDefault: Partial<PropsLayoutAppHeader> = {
  zIndex: 'frame',
}

export const LayoutAppHeader: FunctionComponent<PropsLayoutAppHeader> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <header
      className={cx('layout-app-header', propsVariant.className, styles.layoutAppHeader)}
      data-testid={props['data-testid'] ?? 'view-layout-app-header'}
      id={propsVariant.id}
    >
      {props.children}
    </header>
  )
}
