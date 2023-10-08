import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'
import { AppLayout, useAppTheme } from '@gnowth/lib-application'
import {
  Theme,
  cx,
  systemBackgroundColorFromPalette,
  systemBox,
  systemCompose,
  systemSpace,
} from '@gnowth/lib-theme'
import { TokenSpace } from '@gnowth/lib-token'
import { guardString } from '@gnowth/lib-utils'

const layoutSection = systemCompose(systemBackgroundColorFromPalette(), systemBox(), systemSpace())

export interface VariantLayoutSection extends SystemType<typeof layoutSection> {
  boxVariant?: string
  boxVariantNamespace?: string
  layout?: string
  layoutProps?: Record<string, unknown>
  layoutSpacing?: string | number
  layoutVariant?: string
}

export interface PropsLayoutSection extends VariantLayoutSection {
  children: ReactNode
  className?: string
  classNameRoot?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: VariantLayoutSection | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({ layoutSection })
const definitions = Theme.makeDefinitions(['', 'box'])

const propsDefault = {
  boxVariantNamespace: 'systemBox',
  paddingBottom: TokenSpace.sm,
  paddingLeft: TokenSpace.md,
  paddingRight: TokenSpace.md,
  paddingTop: TokenSpace.sm,
  variantNamespace: 'layoutSection',
}

// TODO: provide a child to allow page section. that way it can have a background and border
export const LayoutSection: FunctionComponent<PropsLayoutSection> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariantByDefinitions(definitions, props, propsDefault, ['layoutProps'])
  const styles = makeStyles(variant, theme)

  return (
    <section
      className={cx(
        'layout-section',
        guardString(variant.variant) && `layout-section--${variant.variant}`,
        variant.className,
        styles.layoutSection,
      )}
      id={variant.id}
    >
      <AppLayout
        className={cx('layout-section__layout', variant.classNameRoot && `${variant.classNameRoot}__layout`)}
        id={variant.id && `${variant.id}__layout`}
        layout={variant.layout}
        layoutProps={variant.layoutProps}
        layoutSpacing={variant.layoutSpacing}
        layoutVariant={variant.layoutVariant}
      >
        {variant.children}
      </AppLayout>
    </section>
  )
}
