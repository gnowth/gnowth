import { useAppTheme } from '@gnowth/lib-application'
import { SystemType, cx, systemCompose, systemPlace, systemSpace, themeMakeStyles } from '@gnowth/lib-theme'
import { FunctionComponent, ReactNode } from 'react'

export type PropsLayoutAppHeader = {
  as?: string
  children: ReactNode
  className?: string
  'data-testid'?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutAppHeader | string
} & SystemType<typeof layoutAppHeader>

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
