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

const uiButton = systemCompose(
  systemBox(),
  systemColor(),
  systemImage(),
  systemLayout(),
  systemPointer(),
  systemSpace(),
)

export interface VariantUIButton extends SystemType<typeof uiButton> {
  breakpoint?: string
  icon?: ComponentType<PropsUIIcon> | string
  iconClassName?: string
  iconHidden?: boolean
  iconSize?: TokenIconSize
  iconValue?: string
  iconVariant?: string
  layout?: string
  layoutProps?: Record<string, unknown>
  layoutSpacing?: string | number
  layoutVariant?: string
  mediaPrintDisabled?: boolean
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
}

// TODO media print should hide by default
export interface PropsUIButton
  extends VariantUIButton,
    SystemType<ReturnType<typeof systemColorFromPalette>> {
  className?: string
  classNameRoot?: string
  disabled?: boolean
  hidden?: boolean
  id?: string
  media?: string
  onClick?: (event: MouseEvent) => void
  palette?: string
  variant?: VariantUIButton | string
  variantNamespace?: string
}

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

const makeStyles = themeStylesMake({ uiButton })

export const UIButton: FunctionComponent<PropsUIButton> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)
  const ComponentIcon = theme.getComponent({ component: variant.icon }) || UIIcon
  const ComponentTypography = theme.getComponent({ component: variant.text }) || UITypography
  const ComponentProgress = theme.getComponent({ component: variant.progress }) || UIProgress

  return (
    <button
      className={cx(
        'ui-button',
        guardString(variant.variant) && `ui-button--${variant.variant}`,
        variant.className,
        variant.classNameRoot,
        styles.uiButton,
      )}
      disabled={variant.disabled}
      id={variant.id}
      onClick={variant.onClick}
      type="button"
    >
      <AppLayout
        className={cx('ui-button__layout', variant.classNameRoot && `${variant.classNameRoot}__layout`)}
        id={variant.id && `${variant.id}__layout`}
        layout={variant.layout}
        layoutProps={variant.layoutProps}
        layoutSpacing={variant.layoutSpacing}
        layoutVariant={variant.layoutVariant}
      >
        {!variant.iconHidden && !!variant.iconValue && (
          <ComponentIcon
            className={cx(
              'ui-button__icon',
              variant.classNameRoot && `${variant.classNameRoot}__icon`,
              variant.iconClassName,
            )}
            id={variant.id && `${variant.id}__icon`}
            size={variant.iconSize}
            slot="icon"
            value={variant.iconValue}
            variant={variant.iconVariant}
          />
        )}

        {!variant.textHidden && guardString(variant.textValue) && (
          <ComponentTypography
            className={cx(
              'ui-button__text',
              variant.classNameRoot && `${variant.classNameRoot}__text`,
              variant.textClassName,
            )}
            id={variant.id && `${variant.id}__text`}
            slot="text"
            value={variant.textValue}
            variant={variant.textVariant}
          />
        )}

        {!variant.progressHidden && (
          <ComponentProgress
            className={cx(
              'ui-button__progress',
              variant.classNameRoot && `${variant.classNameRoot}__progress`,
              variant.progressClassName,
            )}
            id={variant.id && `${variant.id}__progress`}
            palette={variant.progressPalette}
            paletteForContrast={variant.progressPaletteForContrast}
            paletteWeight={variant.progressPaletteWeight}
            size={variant.progressSize}
            slot="progress"
            variant={variant.progressVariant}
          />
        )}
      </AppLayout>
    </button>
  )
}
