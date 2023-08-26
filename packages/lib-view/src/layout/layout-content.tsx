import type { SystemDisplay, SystemFlexbox, SystemPalette, SystemSpace } from '@gnowth/lib-types'
import type { ReactNode } from 'react'
import _ from 'lodash'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  Theme,
  cx,
  systemBackgroundColorFromPalette,
  systemCompose,
  systemDisplay,
  systemFlexbox,
  systemSpace,
} from '@gnowth/lib-theme'

interface ComponentProps {
  className?: string
  id?: string
}

type SystemLayoutContent = SystemDisplay & SystemFlexbox & SystemPalette & SystemSpace

export interface VariantLayoutContent extends SystemLayoutContent {
  as?: React.ComponentType<ComponentProps> | string
}

export interface PropsLayoutContent extends VariantLayoutContent {
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: VariantLayoutContent | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({
  layoutContent: systemCompose<PropsLayoutContent>(
    systemBackgroundColorFromPalette(),
    systemDisplay(),
    systemFlexbox(),
    systemSpace(),
  ),
})

const propsDefault = {
  variantNamespace: 'layoutContent',
}

const LayoutContent: React.FunctionComponent<PropsLayoutContent> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  return React.createElement(
    variant.as ?? 'div',
    {
      className: cx(
        'layout-content',
        _.isString(variant.variant) && `layout-content--${variant.variant}`,
        variant.className,
        styles.layoutContent,
      ),
      id: variant.id,
    },
    variant.children,
  )
}

export default LayoutContent
