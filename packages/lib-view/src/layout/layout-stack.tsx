import { PropsLayout, useAppTheme } from '@gnowth/lib-application'
import {
  SystemType,
  ThemeVariants,
  cx,
  systemCompose,
  systemGrid,
  systemLayout,
  systemSpace,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { ComponentType, FunctionComponent, ReactNode, createElement } from 'react'
import * as R from 'remeda'

interface ComponentProps {
  children?: ReactNode
  className?: string
  'data-testid'?: string
  id?: string
}
export interface PropsLayoutStack extends PropsLayout, SystemType<typeof layoutStack> {
  as?: ComponentType<ComponentProps> | null | string
  children: ReactNode
  className?: string
  'data-testid'?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutStack | string
  variantNamespace?: string
  variants?: ThemeVariants<PropsLayoutStack>
}

const layoutStack = systemCompose(systemGrid(), systemLayout(), systemSpace())
const makeStyles = themeMakeStyles({ layoutStack })

const variants: ThemeVariants<PropsLayoutStack> = {
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  horizontalEnd: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  horizontalStart: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  vertical: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  verticalCenter: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  verticalEnd: {
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  verticalStart: {
    alignItems: 'flex-start',
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
      'data-testid': propsVariant['data-testid'] ?? 'view-layout-stack',
      id: propsVariant.id,
    },
    propsVariant.children,
  )
}
