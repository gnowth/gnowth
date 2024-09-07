import type { PropsLayout } from '@gnowth/lib-application'
import type { SystemType } from '@gnowth/lib-theme'
import type { UtilNamespaced } from '@gnowth/lib-utils'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemCompose, systemGrid, systemLayout, systemSpace, themeStylesMake } from '@gnowth/lib-theme'
import { createElement } from 'react'
import * as R from 'remeda'

interface ComponentProps {
  children?: ReactNode
  className?: string
  id?: string
}
export interface PropsLayoutStack extends PropsLayout, SystemType<typeof layoutStack> {
  as?: ComponentType<ComponentProps> | null | string
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutStack | string
  variantNamespace?: string
  variants?: UtilNamespaced<Partial<PropsLayoutStack>>
}

const layoutStack = systemCompose(systemGrid(), systemLayout(), systemSpace())
const makeStyles = themeStylesMake({ layoutStack })

const variants: UtilNamespaced<Partial<PropsLayoutStack>> = {
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  vertical: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
}
const propsDefault: Partial<PropsLayoutStack> = {
  display: 'flex',
  gap: 'md',
  variant: 'vertical',
  variantNamespace: 'layoutStack',
  variants,
}

// TODO: add responsive
export const LayoutStack: FunctionComponent<PropsLayoutStack> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return createElement(
    propsVariant.as || 'div',
    {
      className: cx(
        'layout-stack',
        R.isString(propsVariant.variant) && `layout-stack--${propsVariant.variant}`,
        propsVariant.className,
        styles.layoutStack,
      ),
      id: propsVariant.id,
    },
    propsVariant.children,
  )
}
