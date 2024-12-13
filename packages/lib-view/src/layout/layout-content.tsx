import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBackgroundColorFromPalette,
  systemCompose,
  systemDisplay,
  systemGrid,
  systemSpace,
  SystemType,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { ComponentType, createElement, FunctionComponent, ReactNode } from 'react'
import * as R from 'remeda'

export type PropsLayoutContent = SystemType<typeof layoutContent> & {
  as?: ComponentType<ComponentProps> | string
  children: ReactNode
  className?: string
  'data-testid'?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutContent | string
  variantNamespace?: string
}
type ComponentProps = {
  className?: string
  'data-testid'?: string
  id?: string
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
      'data-testid': propsVariant['data-testid'] ?? 'view-layout-content',
      id: propsVariant.id,
    },
    propsVariant.children,
  )
}
