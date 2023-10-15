import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemBackgroundColorFromPalette, themeStylesMake } from '@gnowth/lib-theme'

import { UtilSlot } from '../util/util-slot'
import { LayoutContent } from './layout-content'
import { LayoutFlex } from './layout-flex'

const layoutApp = systemBackgroundColorFromPalette()

export interface VariantLayoutApp extends SystemType<typeof layoutApp> {
  spacing?: string | number
}

export interface PropsLayoutApp extends VariantLayoutApp {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
}

const makeStyles = themeStylesMake({ layoutApp })

export const LayoutApp: FunctionComponent<PropsLayoutApp> = (props) => {
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
        <UtilSlot.Content name="header" />

        <LayoutContent as="main" className="layout-app__main" flexGrow="1">
          <UtilSlot.Content name="main" />
        </LayoutContent>

        <UtilSlot.Content name="footer" />
      </LayoutFlex>
    </UtilSlot.Provider>
  )
}
