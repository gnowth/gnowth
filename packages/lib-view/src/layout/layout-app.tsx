import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBackgroundColorFromPalette,
  systemCompose,
  systemGap,
  themeStylesMake,
} from '@gnowth/lib-theme'

import { UtilSlot } from '../util/util-slot'
import { LayoutStack } from './layout-stack'

export interface PropsLayoutApp extends SystemType<typeof layoutApp> {
  children: ReactNode
  variant?: PropsLayoutApp | string
}

const layoutApp = systemCompose(systemBackgroundColorFromPalette(), systemGap())
const makeStyles = themeStylesMake({ layoutApp })

export const LayoutApp: FunctionComponent<PropsLayoutApp> = (props) => {
  const theme = useAppTheme()
  const propsVariant = theme.getPropsVariant(props)
  const styles = makeStyles(propsVariant, theme)

  return (
    <UtilSlot.Provider slots={props.children}>
      <LayoutStack className={cx('layout-app', styles.layoutApp)} gap={props.gap ?? 'none'} minHeight="100vh">
        <UtilSlot.Content name="header" />

        <UtilSlot.Content name="main" />

        <UtilSlot.Content name="footer" />
      </LayoutStack>
    </UtilSlot.Provider>
  )
}
