import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemCompose, systemFlexbox, systemSpace, themeStylesMake } from '@gnowth/lib-theme'

export interface PropsLayoutAppMain extends SystemType<typeof layoutAppMain> {
  as?: string
  children: ReactNode
  className?: string
  'data-testid'?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutAppMain | string
}

const layoutAppMain = systemCompose(systemFlexbox(), systemSpace())
const makeStyles = themeStylesMake({ layoutAppMain })

export const LayoutAppMain: FunctionComponent<PropsLayoutAppMain> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const styles = makeStyles(props, theme)

  return (
    <main
      className={cx('layout-app-main', props.className, styles.layoutAppMain)}
      data-testid={props['data-testid']}
      id={props.id}
    >
      {props.children}
    </main>
  )
}
