import { AppLayout, useAppTheme } from '@gnowth/lib-application'
import {
  SystemType,
  ThemeVariable,
  ThemeVariants,
  cx,
  systemBackgroundColorFromPalette,
  systemBox,
  systemCompose,
  systemSpace,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { FunctionComponent, ReactNode } from 'react'
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
  variantComposition?: string[]
  variantNamespace?: string
  variants?: ThemeVariants<PropsLayoutSection>
}

const layoutSection = systemCompose(systemBackgroundColorFromPalette(), systemBox(), systemSpace())
const makeStyles = themeMakeStyles({ layoutSection })
const variants: ThemeVariants<PropsLayoutSection> = {
  container: (props) => ({
    layout: 'stack',
    layoutProps: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: props.theme.getVariable<string>(ThemeVariable.widthContent),
      paddingLeft: 'md',
      paddingRight: 'md',
    },
    paddingLeft: 'none',
    paddingRight: 'none',
  }),
  navigation: (props) => ({
    layout: 'flex',
    layoutProps: {
      gap: 'none',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: props.theme.getVariable<string>(ThemeVariable.widthContent),
      paddingLeft: 'sm',
      paddingRight: 'sm',
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
  variantComposition: ['box'],
  variantNamespace: 'layoutSection',
  variants,
}

// TODO: provide a child to allow page section. that way it can have a background and border
export const LayoutSection: FunctionComponent<PropsLayoutSection> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <section
      className={cx(
        'layout-section',
        R.isString(propsVariant.variant) && `layout-section--${propsVariant.variant}`,
        propsVariant.className,
        styles.layoutSection,
      )}
      data-testid={propsVariant['data-testid'] ?? 'view-layout-section'}
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
