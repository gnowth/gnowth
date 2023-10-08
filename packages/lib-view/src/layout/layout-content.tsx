import type { SystemType } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'
import { createElement } from 'react'
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
import { guardString } from '@gnowth/lib-utils'

interface ComponentProps {
  className?: string
  id?: string
}

const layoutContent = systemCompose(
  systemBackgroundColorFromPalette(),
  systemDisplay(),
  systemFlexbox(),
  systemSpace(),
)

export interface VariantLayoutContent extends SystemType<typeof layoutContent> {
  as?: ComponentType<ComponentProps> | string
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

const makeStyles = Theme.makeStyles({ layoutContent })

const propsDefault = {
  variantNamespace: 'layoutContent',
}

export const LayoutContent: FunctionComponent<PropsLayoutContent> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  return createElement(
    variant.as ?? 'div',
    {
      className: cx(
        'layout-content',
        guardString(variant.variant) && `layout-content--${variant.variant}`,
        variant.className,
        styles.layoutContent,
      ),
      id: variant.id,
    },
    variant.children,
  )
}
