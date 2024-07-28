import type { PropsLayout } from '@gnowth/lib-application'
import type { System, SystemType } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemCompose,
  systemFlexbox,
  systemLayout,
  systemSpace,
  themeStylesMake,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'
import { createElement } from 'react'

interface ComponentProps {
  children?: ReactNode
  className?: string
  id?: string
}
export interface PropsLayoutFlex extends PropsLayout, SystemType<typeof layoutFlex> {
  as?: ComponentType<ComponentProps> | null | string
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutFlex | string
  variantNamespace?: string
}

// TODO Fix props.flexDirection type
const systemSpacing: System<PropsLayoutFlex> = (props, theme) =>
  props.spacing
    ? {
        '> * + *': {
          [{
            column: 'marginTop',
            'column-reverse': 'marginBottom',
            row: 'marginLeft',
            'row-reverse': 'marginRight',
          }[props.flexDirection as string] || 'marginLeft']: theme.getScaleItem({
            scale: 'space',
            scaleToken: props.spacing,
          }),
        },
      }
    : {}
const layoutFlex = systemCompose(systemFlexbox(), systemLayout(), systemSpace())
const makeStyles = themeStylesMake({ layoutFlex: systemCompose(layoutFlex, systemSpacing) })

const variants = {
  horizontalBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  verticalStretch: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
}

const propsDefault = {
  display: 'flex',
  spacing: 'md',
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
        guardString(propsVariant.variant) && `layout-flex--${propsVariant.variant}`,
        propsVariant.className,
        styles.layoutFlex,
      ),
      id: propsVariant.id,
    },
    propsVariant.children,
  )
}
