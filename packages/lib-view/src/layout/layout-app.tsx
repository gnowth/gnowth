import { useAppTheme } from '@gnowth/lib-application'
import {
  SystemType,
  cx,
  systemBackgroundColorFromPalette,
  systemCompose,
  systemGap,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { FunctionComponent, ReactNode } from 'react'

import { UtilSlot } from '../util/util-slot'
import { LayoutStack } from './layout-stack'

export interface PropsLayoutApp extends SystemType<typeof layoutApp> {
  children: ReactNode
  variant?: PropsLayoutApp | string
}

const layoutApp = systemCompose(systemBackgroundColorFromPalette(), systemGap())
const makeStyles = themeMakeStyles({ layoutApp })

export const LayoutApp: FunctionComponent<PropsLayoutApp> = (props) => {
  const theme = useAppTheme()
  const propsVariant = theme.getPropsVariant(props)
  const styles = makeStyles(propsVariant, theme)

  return (
    <UtilSlot.Provider slots={props.children}>
      <LayoutStack
        className={cx('layout-app', styles.layoutApp)}
        data-testid="view-layout-app"
        gap={props.gap ?? 'none'}
        minHeight="100vh"
      >
        <UtilSlot.Content name="header" />

        <UtilSlot.Content name="main" />

        <UtilSlot.Content name="footer" />
      </LayoutStack>
    </UtilSlot.Provider>
  )
}
