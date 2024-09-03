import type { SystemType, VariantType } from '@gnowth/lib-theme'
import type { UtilNamespaced } from '@gnowth/lib-utils'
import type { FunctionComponent, ReactNode } from 'react'

import { AppLayout, useAppTheme } from '@gnowth/lib-application'
import {
  TokenVariable,
  cx,
  systemBackgroundColorFromPalette,
  systemBox,
  systemCompose,
  systemSpace,
  themeDefinitionsMake,
  themeStylesMake,
} from '@gnowth/lib-theme'
import * as R from 'remeda'

export interface PropsLayoutSection extends SystemType<typeof layoutSection> {
  boxVariant?: string
  boxVariantNamespace?: string
  children: ReactNode
  className?: string
  classNamespace?: string
  'data-testid'?: string
  hidden?: boolean
  id?: string
  layout?: string
  layoutProps?: Record<string, unknown>
  layoutVariant?: string
  slot?: string
  variant?: PropsLayoutSection | string
  variantNamespace?: string
  variants?: UtilNamespaced<VariantType<PropsLayoutSection>>
}

const layoutSection = systemCompose(systemBackgroundColorFromPalette(), systemBox(), systemSpace())
const makeStyles = themeStylesMake({ layoutSection })
const definitions = themeDefinitionsMake(['', 'box'])
const variants: UtilNamespaced<VariantType<PropsLayoutSection>> = {
  container: (props) => ({
    layout: 'stack',
    layoutProps: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: props.theme.getVariable<string>(TokenVariable.widthContent),
      paddingLeft: 'md',
      paddingRight: 'md',
    },
    paddingLeft: 'none',
    paddingRight: 'none',
  }),
  nav: (props) => ({
    borderBottom: `1px solid ${props.theme.getPaletteColor({ palette: 'gray', paletteWeight: '400' })}`,
    borderTop: `1px solid ${props.theme.getPaletteColor({ palette: 'gray', paletteWeight: '400' })}`,
    layout: 'flex',
    layoutProps: {
      gap: 'none',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: props.theme.getVariable<string>(TokenVariable.widthContent),
    },
    paddingBottom: 'none',
    paddingLeft: 'none',
    paddingRight: 'none',
    paddingTop: 'none',
  }),
}

const propsDefault: Partial<PropsLayoutSection> = {
  boxVariantNamespace: 'systemBox',
  paddingBottom: 'sm',
  paddingLeft: 'md',
  paddingRight: 'md',
  paddingTop: 'sm',
  variantNamespace: 'layoutSection',
  variants,
}

// TODO: provide a child to allow page section. that way it can have a background and border
export const LayoutSection: FunctionComponent<PropsLayoutSection> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariantByDefinitions(definitions, props, propsDefault, ['layoutProps'])
  const styles = makeStyles(propsVariant, theme)

  return (
    <section
      className={cx(
        'layout-section',
        R.isString(propsVariant.variant) && `layout-section--${propsVariant.variant}`,
        propsVariant.className,
        styles.layoutSection,
      )}
      data-testid={propsVariant['data-testid']}
      id={propsVariant.id}
    >
      <AppLayout
        className={cx(
          'layout-section--layout',
          propsVariant.classNamespace && `${propsVariant.classNamespace}--layout`,
        )}
        id={propsVariant.id && `${propsVariant.id}--layout`}
        layout={propsVariant.layout}
        layoutProps={propsVariant.layoutProps}
        layoutVariant={propsVariant.layoutVariant}
      >
        {propsVariant.children}
      </AppLayout>
    </section>
  )
}
