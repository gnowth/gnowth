import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'
import { AppLayout, useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBackgroundColorFromPalette,
  systemBox,
  systemCompose,
  systemSpace,
  themeDefinitionsMake,
  themeStylesMake,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'

export interface PropsLayoutSection extends SystemType<typeof layoutSection> {
  boxVariant?: string
  boxVariantNamespace?: string
  children: ReactNode
  className?: string
  classNamespace?: string
  hidden?: boolean
  id?: string
  layout?: string
  layoutProps?: Record<string, unknown>
  layoutSpacing?: string | number
  layoutVariant?: string
  slot?: string
  variant?: PropsLayoutSection | string
  variantNamespace?: string
}

const layoutSection = systemCompose(systemBackgroundColorFromPalette(), systemBox(), systemSpace())
const makeStyles = themeStylesMake({ layoutSection })
const definitions = themeDefinitionsMake(['', 'box'])
const propsDefault: Partial<PropsLayoutSection> = {
  boxVariantNamespace: 'systemBox',
  paddingBottom: 'sm',
  paddingLeft: 'md',
  paddingRight: 'md',
  paddingTop: 'sm',
  variantNamespace: 'layoutSection',
}

// TODO: provide a child to allow page section. that way it can have a background and border
export const LayoutSection: FunctionComponent<PropsLayoutSection> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getVariantByDefinitions(definitions, props, propsDefault, ['layoutProps'])
  const styles = makeStyles(propsVariant, theme)

  return (
    <section
      className={cx(
        'layout-section',
        guardString(propsVariant.variant) && `layout-section--${propsVariant.variant}`,
        propsVariant.className,
        styles.layoutSection,
      )}
      id={propsVariant.id}
    >
      <AppLayout
        className={cx(
          'layout-section__layout',
          propsVariant.classNamespace && `${propsVariant.classNamespace}__layout`,
        )}
        id={propsVariant.id && `${propsVariant.id}__layout`}
        layout={propsVariant.layout}
        layoutProps={propsVariant.layoutProps}
        layoutSpacing={propsVariant.layoutSpacing}
        layoutVariant={propsVariant.layoutVariant}
      >
        {propsVariant.children}
      </AppLayout>
    </section>
  )
}
