import { PropsLayout, useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemCompose,
  systemGrid,
  systemLayout,
  systemSpace,
  SystemType,
  themeMakeStyles,
  ThemeVariants,
} from '@gnowth/lib-theme'
import { ComponentType, createElement, FunctionComponent, ReactNode } from 'react'
import * as R from 'remeda'

export type PropsLayoutFlex = PropsLayout &
  SystemType<typeof layoutFlex> & {
    as?: ComponentType<ComponentProps> | null | string
    children: ReactNode
    className?: string
    'data-testid'?: string
    hidden?: boolean
    id?: string
    slot?: string
    variant?: PropsLayoutFlex | string
    variantNamespace?: string
    variants?: ThemeVariants<PropsLayoutFlex>
  }
type ComponentProps = {
  children?: ReactNode
  className?: string
  'data-testid'?: string
  id?: string
}

const layoutFlex = systemCompose(systemGrid(), systemLayout(), systemSpace())
const makeStyles = themeMakeStyles({ layoutFlex })

const variants: ThemeVariants<PropsLayoutFlex> = {
  horizontalBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  horizontalBottom: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  horizontalCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  horizontalLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  horizontalReverseLeft: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },

  horizontalRight: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  horizontalTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  verticalCenter: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  verticalStretch: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
}

const propsDefault: Partial<PropsLayoutFlex> = {
  display: 'flex',
  gap: 'md',
  variant: 'horizontalLeft',
  variantNamespace: 'layoutFlex',
  variants,
}

// TODO: add responsive
export const LayoutFlex: FunctionComponent<PropsLayoutFlex> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return createElement(
    propsVariant.as || 'div',
    {
      className: cx(
        'layout-flex',
        R.isString(propsVariant.variant) && `layout-flex--${propsVariant.variant}`,
        propsVariant.className,
        styles.layoutFlex,
      ),
      'data-testid': propsVariant['data-testid'] ?? 'view-layout-flex',
      id: propsVariant.id,
    },
    propsVariant.children,
  )
}
