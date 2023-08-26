import type {
  CSSObject,
  PropsLayout,
  SystemFlexbox,
  SystemLayout,
  SystemSpace,
  Theme as ThemeType,
} from '@gnowth/lib-types'
import _ from 'lodash'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { Theme, cx, systemCompose, systemFlexbox, systemLayout, systemSpace } from '@gnowth/lib-theme'
import { TokenSpace } from '@gnowth/lib-token'

interface ComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
}

type SystemLayoutFlex = SystemFlexbox & SystemLayout & SystemSpace

export interface VariantLayoutFlex extends SystemLayoutFlex {
  as?: React.ComponentType<ComponentProps> | string | null
}

export interface PropsLayoutFlex extends PropsLayout, VariantLayoutFlex {
  children: React.ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: string
  variantNamespace?: string
}

// TODO Fix props.flexDirection type
const systemSpacing = (props: PropsLayoutFlex, theme: ThemeType): CSSObject =>
  props.spacing
    ? {
        '> * + *': {
          [{
            'column-reverse': 'marginBottom',
            'row-reverse': 'marginRight',
            column: 'marginTop',
            row: 'marginLeft',
          }[props.flexDirection as string] || 'marginLeft']: theme.getScaleItem({
            scale: 'space',
            token: props.spacing,
          }),
        },
      }
    : {}

const makeStyles = Theme.makeStyles({
  layoutFlex: systemCompose<PropsLayoutFlex>(systemFlexbox(), systemLayout(), systemSpace(), systemSpacing),
})

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

  horizontalRight: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  horizontalReverseLeft: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },

  verticalStretch: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
}

const propsDefault = {
  variantLocals,
  display: 'flex',
  spacing: TokenSpace.md,
  variant: 'horizontalLeft',
  variantNamespace: 'layoutFlex',
}

// TODO: add responsive
const LayoutFlex: React.FunctionComponent<PropsLayoutFlex> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  return React.createElement(
    variant.as || 'div',
    {
      className: cx(
        'layout-flex',
        _.isString(variant.variant) && `layout-flex--${variant.variant}`,
        variant.className,
        styles.layoutFlex,
      ),
      id: variant.id,
    },
    variant.children,
  )
}

export default LayoutFlex
