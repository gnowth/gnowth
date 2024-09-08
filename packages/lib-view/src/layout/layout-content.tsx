import type { SystemType } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBackgroundColorFromPalette,
  systemCompose,
  systemDisplay,
  systemGrid,
  systemSpace,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { createElement } from 'react'
import * as R from 'remeda'

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
  systemGrid(),
  systemSpace(),
)
const makeStyles = themeMakeStyles({ layoutContent })
const propsDefault: Partial<PropsLayoutContent> = {
  variantNamespace: 'layoutContent',
}

export const LayoutContent: FunctionComponent<PropsLayoutContent> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return createElement(
    propsVariant.as ?? 'div',
    {
      className: cx(
        'layout-content',
        R.isString(propsVariant.variant) && `layout-content--${propsVariant.variant}`,
        propsVariant.className,
        styles.layoutContent,
      ),
      id: propsVariant.id,
    },
    propsVariant.children,
  )
}
