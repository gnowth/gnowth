import type { PropsLayout } from '@gnowth/lib-application'
import type { System, SystemType } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { Theme, cx, systemCompose, systemFlexbox, systemLayout, systemSpace } from '@gnowth/lib-theme'
import { TokenSpace } from '@gnowth/lib-token'
import { guardString } from '@gnowth/lib-utils'
import { createElement } from 'react'

interface ComponentProps {
  className?: string
  children?: ReactNode
  id?: string
}

const layoutFlex = systemCompose(systemFlexbox(), systemLayout(), systemSpace())

export interface VariantLayoutFlex extends SystemType<typeof layoutFlex> {
  as?: ComponentType<ComponentProps> | string | null
}

export interface PropsLayoutFlex extends PropsLayout, VariantLayoutFlex {
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: string
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
            token: props.spacing,
          }),
        },
      }
    : {}

const makeStyles = Theme.makeStyles({ layoutFlex: systemCompose(layoutFlex, systemSpacing) })

const variantLocals = {
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
  spacing: TokenSpace.md,
  variant: 'horizontalLeft',
  variantLocals,
  variantNamespace: 'layoutFlex',
}

// TODO: add responsive
export const LayoutFlex: FunctionComponent<PropsLayoutFlex> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  return createElement(
    variant.as || 'div',
    {
      className: cx(
        'layout-flex',
        guardString(variant.variant) && `layout-flex--${variant.variant}`,
        variant.className,
        styles.layoutFlex,
      ),
      id: variant.id,
    },
    variant.children,
  )
}
