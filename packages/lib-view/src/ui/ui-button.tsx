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
import * as R from 'remeda'

import type { PropsBase } from '../types'
import type { PropsUIIcon } from './ui-icon'
import type { PropsUIProgress } from './ui-progress'
import type { PropsUITypography } from './ui-typography'

import { UIIcon } from './ui-icon'
import { UIProgress } from './ui-progress'
import { UITypography } from './ui-typography'

// TODO media print should hide by default
// TODO: what does breakpoint and media do?
export type PropsUIButton = PropsBase<
  {
    breakpoint?: string
    icon?: ComponentType<PropsUIIcon> | string
    iconClassName?: string
    iconHidden?: boolean
    iconSize?: TokenIconSize
    iconValue?: string
    iconVariant?: string
    layout?: string
    layoutProps?: Record<string, unknown>
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
  } & SystemType<ReturnType<typeof systemColorFromPalette>> &
    SystemType<typeof uiButton>
>

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
const propsDefault: PropsUIButton = {
  layout: 'flex',
  layoutProps: { gap: 'xs' },
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
        R.isString(propsVariant.variant) && `ui-button--${propsVariant.variant}`,
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
          'ui-button--layout',
          propsVariant.classNamespace && `${propsVariant.classNamespace}--layout`,
        )}
        id={propsVariant.id && `${propsVariant.id}--layout`}
        layout={propsVariant.layout}
        layoutProps={propsVariant.layoutProps}
        layoutVariant={propsVariant.layoutVariant}
      >
        {!propsVariant.iconHidden && !!propsVariant.iconValue && (
          <ComponentIcon
            className={cx(
              'ui-button--icon',
              propsVariant.classNamespace && `${propsVariant.classNamespace}--icon`,
              propsVariant.iconClassName,
            )}
            id={propsVariant.id && `${propsVariant.id}--icon`}
            size={propsVariant.iconSize}
            slot="icon"
            value={propsVariant.iconValue}
            variant={propsVariant.iconVariant}
          />
        )}

        {!propsVariant.textHidden && R.isString(propsVariant.textValue) && (
          <ComponentTypography
            className={cx(
              'ui-button--text',
              propsVariant.classNamespace && `${propsVariant.classNamespace}--text`,
              propsVariant.textClassName,
            )}
            id={propsVariant.id && `${propsVariant.id}--text`}
            slot="text"
            value={propsVariant.textValue}
            variant={propsVariant.textVariant}
          />
        )}

        {!propsVariant.progressHidden && (
          <ComponentProgress
            className={cx(
              'ui-button--progress',
              propsVariant.classNamespace && `${propsVariant.classNamespace}--progress`,
              propsVariant.progressClassName,
            )}
            id={propsVariant.id && `${propsVariant.id}--progress`}
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
