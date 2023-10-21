import type { SystemType, TokenColorWeight, TokenIconSize, systemColorFromPalette } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, MouseEvent } from 'react'
import { AppLayout, useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBox,
  systemColor,
  systemCompose,
  systemImage,
  systemLayout,
  systemPointer,
  systemSpace,
  themeStylesMake,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'

import { UIIcon, PropsUIIcon } from './ui-icon'
import { UIProgress, PropsUIProgress } from './ui-progress'
import { UITypography, PropsUITypography } from './ui-typography'

// TODO media print should hide by default
export interface PropsUIButton
  extends SystemType<typeof uiButton>,
    SystemType<ReturnType<typeof systemColorFromPalette>> {
  breakpoint?: string
  className?: string
  classNamespace?: string
  disabled?: boolean
  hidden?: boolean
  icon?: ComponentType<PropsUIIcon> | string
  iconClassName?: string
  iconHidden?: boolean
  iconSize?: TokenIconSize
  iconValue?: string
  iconVariant?: string
  id?: string
  layout?: string
  layoutProps?: Record<string, unknown>
  layoutSpacing?: string | number
  layoutVariant?: string
  media?: string
  mediaPrintDisabled?: boolean
  onClick?: (event: MouseEvent) => void
  palette?: string
  progress?: ComponentType<PropsUIProgress> | string
  progressClassName?: string
  progressHidden?: boolean
  progressPalette?: string
  progressPaletteForContrast?: boolean
  progressPaletteWeight?: TokenColorWeight
  progressSize?: TokenIconSize
  progressVariant?: string
  // progressVariants?: string[]
  text?: ComponentType<PropsUITypography> | string
  textClassName?: string
  textHidden?: boolean
  textProps?: PropsUITypography
  textValue?: string
  textVariant?: string
  variant?: PropsUIButton | string
  variantNamespace?: string
}

const uiButton = systemCompose(
  systemBox(),
  systemColor(),
  systemImage(),
  systemLayout(),
  systemPointer(),
  systemSpace(),
)
const makeStyles = themeStylesMake({ uiButton })
// TODO: add default palette?
const propsDefault = {
  layout: 'flex',
  layoutSpacing: 'xs',
  layoutVariant: 'horizontalCenter',
  palette: 'textPrimary',
  progressHidden: true,
  textVariant: 'button',
  variant: 'text',
  variantNamespace: 'uiButton',
}

export const UIButton: FunctionComponent<PropsUIButton> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)
  const ComponentIcon = theme.getComponent({ component: propsVariant.icon }) || UIIcon
  const ComponentTypography = theme.getComponent({ component: propsVariant.text }) || UITypography
  const ComponentProgress = theme.getComponent({ component: propsVariant.progress }) || UIProgress

  return (
    <button
      className={cx(
        'ui-button',
        guardString(propsVariant.variant) && `ui-button--${propsVariant.variant}`,
        propsVariant.className,
        propsVariant.classNamespace,
        styles.uiButton,
      )}
      disabled={propsVariant.disabled}
      id={propsVariant.id}
      onClick={propsVariant.onClick}
      type="button"
    >
      <AppLayout
        className={cx(
          'ui-button__layout',
          propsVariant.classNamespace && `${propsVariant.classNamespace}__layout`,
        )}
        id={propsVariant.id && `${propsVariant.id}__layout`}
        layout={propsVariant.layout}
        layoutProps={propsVariant.layoutProps}
        layoutSpacing={propsVariant.layoutSpacing}
        layoutVariant={propsVariant.layoutVariant}
      >
        {!propsVariant.iconHidden && !!propsVariant.iconValue && (
          <ComponentIcon
            className={cx(
              'ui-button__icon',
              propsVariant.classNamespace && `${propsVariant.classNamespace}__icon`,
              propsVariant.iconClassName,
            )}
            id={propsVariant.id && `${propsVariant.id}__icon`}
            size={propsVariant.iconSize}
            slot="icon"
            value={propsVariant.iconValue}
            variant={propsVariant.iconVariant}
          />
        )}

        {!propsVariant.textHidden && guardString(propsVariant.textValue) && (
          <ComponentTypography
            className={cx(
              'ui-button__text',
              propsVariant.classNamespace && `${propsVariant.classNamespace}__text`,
              propsVariant.textClassName,
            )}
            id={propsVariant.id && `${propsVariant.id}__text`}
            slot="text"
            value={propsVariant.textValue}
            variant={propsVariant.textVariant}
          />
        )}

        {!propsVariant.progressHidden && (
          <ComponentProgress
            className={cx(
              'ui-button__progress',
              propsVariant.classNamespace && `${propsVariant.classNamespace}__progress`,
              propsVariant.progressClassName,
            )}
            id={propsVariant.id && `${propsVariant.id}__progress`}
            palette={propsVariant.progressPalette}
            paletteForContrast={propsVariant.progressPaletteForContrast}
            paletteWeight={propsVariant.progressPaletteWeight}
            size={propsVariant.progressSize}
            slot="progress"
            variant={propsVariant.progressVariant}
          />
        )}
      </AppLayout>
    </button>
  )
}
