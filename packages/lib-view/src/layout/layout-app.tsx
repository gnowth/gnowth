import type { SystemPalette } from '@gnowth/lib-types'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { Theme, cx, systemBackgroundColorFromPalette } from '@gnowth/lib-theme'
import { UtilSlot } from '@gnowth/lib-util'

import LayoutContent from './layout-content'
import LayoutFlex from './layout-flex'

export interface VariantLayoutApp extends SystemPalette {
  spacing?: string | number
}

export interface PropsLayoutApp extends VariantLayoutApp {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
}

const makeStyles = Theme.makeStyles({
  layoutApp: systemBackgroundColorFromPalette(),
})

const LayoutApp: React.FunctionComponent<PropsLayoutApp> = (props) => {
  const theme = useAppTheme()

  const variant = theme.getVariant(props)
  const styles = makeStyles(variant, theme)

  return (
    <UtilSlot.Provider slots={props.children}>
      <LayoutFlex
        alignItems="stretch"
        className={cx('layout-app', styles.layoutApp)}
        flexDirection="column"
        minHeight="100vh"
        spacing={props.spacing}
      >
        <UtilSlot name="header" />

        <LayoutContent as="main" className="layout-app__main" flexGrow="1">
          <UtilSlot name="main" />
        </LayoutContent>

        <UtilSlot name="footer" />
      </LayoutFlex>
    </UtilSlot.Provider>
  )
}

export default LayoutApp
