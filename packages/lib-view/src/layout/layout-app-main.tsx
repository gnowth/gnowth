import { useAppTheme } from '@gnowth/lib-application'
import { SystemType, cx, systemCompose, systemGrid, systemSpace, themeMakeStyles } from '@gnowth/lib-theme'
import { FunctionComponent, ReactNode } from 'react'

export type PropsLayoutAppMain = {
  as?: string
  children: ReactNode
  className?: string
  'data-testid'?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutAppMain | string
} & SystemType<typeof layoutAppMain>

const layoutAppMain = systemCompose(systemGrid(), systemSpace())
const makeStyles = themeMakeStyles({ layoutAppMain })

export const LayoutAppMain: FunctionComponent<PropsLayoutAppMain> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const styles = makeStyles(props, theme)

  return (
    <main
      className={cx('layout-app-main', props.className, styles.layoutAppMain)}
      data-testid={props['data-testid'] ?? 'view-layout-app-main'}
      id={props.id}
    >
      {props.children}
    </main>
  )
}
