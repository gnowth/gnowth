import type { SystemType } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'
import { createElement } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBackgroundColorFromPalette,
  systemCompose,
  systemDisplay,
  systemFlexbox,
  systemSpace,
  themeStylesMake,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'

interface ComponentProps {
  className?: string
  id?: string
}

export interface PropsLayoutContent extends SystemType<typeof layoutContent> {
  as?: ComponentType<ComponentProps> | string
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutContent | string
  variantNamespace?: string
}

const layoutContent = systemCompose(
  systemBackgroundColorFromPalette(),
  systemDisplay(),
  systemFlexbox(),
  systemSpace(),
)
const makeStyles = themeStylesMake({ layoutContent })

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
