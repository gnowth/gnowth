import type {
  PropsDataReadonly,
  PropsLayout,
  SystemDisplay,
  SystemPalette,
  SystemSize,
  SystemSpace,
  Theme as ThemeType,
} from '@gnowth/lib-types'
import _ from 'lodash'
import React from 'react'
import { useAnimationDelayReady } from '@gnowth/lib-animation'
import { AppLayout, useAppTheme } from '@gnowth/lib-application'
import {
  Theme,
  cx,
  keyframes,
  systemCompose,
  systemDisplay,
  systemSize,
  systemSpace,
} from '@gnowth/lib-theme'
import { TokenIconSize } from '@gnowth/lib-token'

import { UtilSlot } from '../util/util-slot'

const stylesLayout = Theme.createStyles({
  layoutContainer: `
    box-sizing: border-box;
    padding: 10%;
    position: relative;
  `,
  layoutContent: `
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  `,
  layoutProgress: `
    height: 100%;
    width: 100%;
  `,
})

const LayoutSuperImpose: React.FunctionComponent<PropsLayout> = (props) => (
  <UtilSlot.Provider slots={props.children}>
    <div className={cx(props.className, props.classNameRoot, stylesLayout.layoutContainer)} id={props.id}>
      <UtilSlot.Test test="progress">
        <div
          className={cx(
            stylesLayout.layoutProgress,
            props.classNameRoot && `${props.classNameRoot}__progress`,
          )}
          id={props.id && `${props.id}__progress`}
        >
          <UtilSlot.Content name="progress" />
        </div>
      </UtilSlot.Test>

      <UtilSlot.Test test="content">
        <div
          className={cx(stylesLayout.layoutContent, props.classNameRoot && `${props.classNameRoot}__content`)}
          id={props.id && `${props.id}__content`}
        >
          <UtilSlot.Content name="content" />
        </div>
      </UtilSlot.Test>
    </div>
  </UtilSlot.Provider>
)

type SystemUIProgress = SystemPalette & SystemDisplay & SystemSize & SystemSpace

export interface VariantUIProgress extends SystemUIProgress {
  as?: string
  bufferPalette?: string
  bufferPaletteForContrast?: boolean
  bufferPaletteWeight?: string
  layout?: React.ComponentType<PropsLayout> | string
  layoutProps?: Record<string, unknown>
  layoutSpacing?: string | number
  layoutVariant?: string
  thickness?: number
  transitionDuration?: string
}

export interface PropsUIProgress extends PropsDataReadonly<number | null>, VariantUIProgress {
  children?: React.ReactNode
  className?: string
  classNameRoot?: string
  hidden?: boolean
  slot?: string
  valueMax?: number
  variant?: VariantUIProgress | string
  variantNamespace?: string
}

const spinnerRotateLinear = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`

const spinnerStrokeRotate = (props: PropsUIProgress) => keyframes`
  0% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 19}px;
    transform: rotate(0);
  }
  12.5% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 4}px;
    transform: rotate(0);
  }
  12.5001% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 4}px;
    transform: rotateX(180deg) rotate(72.5deg);
  }
  25% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 19}px;
    transform: rotateX(180deg) rotate(72.5deg);
  }
  25.0001% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 19}px;
    transform: rotate(270deg);
  }
  37.5% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 4}px;
    transform: rotate(270deg);
  }
  37.5001% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 4}px;
    transform: rotateX(180deg) rotate(161.5deg);
  }
  50% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 19}px;
    transform: rotateX(180deg) rotate(161.5deg);
  }
  50.0001% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 19}px;
    transform: rotate(180deg);
  }
  62.5% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 4}px;
    transform: rotate(180deg);
  }
  62.5001% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 4}px;
    transform: rotateX(180deg) rotate(251.5deg);
  }
  75% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 19}px;
    transform: rotateX(180deg) rotate(251.5deg);
  }
  75.0001% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 19}px;
    transform: rotate(90deg);
  }
  87.5% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 4}px;
    transform: rotate(90deg);
  }
  87.5001% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 4}px;
    transform: rotateX(180deg) rotate(341.5deg);
  }
  100% {
    stroke-dashoffset: ${(5 - (props.thickness ?? 1)) * Math.PI * 19}px;
    transform: rotateX(180deg) rotate(341.5deg);
  }
`

const makeStyles = Theme.makeStyles({
  uiProgress: systemCompose<PropsUIProgress>(systemDisplay(), systemSize('iconsize'), systemSpace()),

  uiProgressCircle: (props: PropsUIProgress, theme: ThemeType) => ({
    animationName: spinnerStrokeRotate(props),
    fill: 'transparent',
    stroke: theme.getPaletteColor(props),
    strokeDasharray: (5 - (props.thickness ?? 1)) * Math.PI * 20,
    strokeWidth: `${(props.thickness ?? 1) * 20}%`,
    transformBox: 'view-box',
    transformOrigin: 'center',
    transition: `stroke-dashoffset ${props.transitionDuration ?? ''} linear`,

    ...(props.value === null && {
      animationDuration: '4s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.35, 0, 0.25, 1)',
      transitionProperty: 'stroke',
    }),

    ...(props.value !== null && {
      strokeDashoffset:
        (5 - (props.thickness ?? 1)) * (1 - (props.value ?? 0) / (props.valueMax ?? 100)) * Math.PI * 20,
    }),
  }),

  uiProgressCircleBuffer: (props: PropsUIProgress, theme: ThemeType) => ({
    stroke: theme.getPaletteColor({
      palette: props.bufferPalette,
      paletteForContrast: props.bufferPaletteForContrast,
      paletteWeight: props.bufferPaletteWeight,
    }),
    strokeDashoffset: 0,
  }),

  uiProgressCircleInitial: `stroke-dashoffset: ${Math.PI * 80}`,

  uiProgressSvg: (props: PropsUIProgress) => ({
    height: '100%',
    transform: 'rotate(-90deg)',
    transformOrigin: 'center',
    width: '100%',
    ...(props.value === null && { animation: `${spinnerRotateLinear} 2s linear infinite` }),
  }),
})

const propsDefault = {
  bufferPalette: 'primary',
  display: 'inline-block',
  layout: LayoutSuperImpose,
  palette: 'primary',
  size: TokenIconSize.xs,
  thickness: 1,
  transitionDuration: '225ms',
  value: null,
  valueInitial: 0,
  valueMax: 100,
  variantNamespace: 'uiProgress',
}

// TODO can keyframes be extracted in to an animation library or into the theme
// TODO: delay cause animation synchronisation issue
// TODO should props, propsDefault, context, state be generalize in a type?
// TODO: add animation if a number starts from 0 to number?
// TODO: fix alignment and padding
export const UIProgress: React.FunctionComponent<PropsUIProgress> = (props) => {
  const ready = useAnimationDelayReady()
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)

  return (
    <div
      className={cx(
        'ui-progress',
        _.isString(variant.variant) && `ui-progress--${variant.variant}`,
        variant.className,
        styles.uiProgress,
      )}
      id={variant.id}
    >
      <AppLayout
        classNameRoot="ui-progress__layout"
        id={variant.id && `${variant.id}__layout`}
        layout={variant.layout}
        layoutProps={variant.layoutProps}
        layoutSpacing={variant.layoutSpacing}
        layoutVariant={variant.layoutVariant}
      >
        <UtilSlot slot="progress">
          <svg
            className={cx(
              'ui-progress__svg',
              variant.classNameRoot && `${variant.classNameRoot}__svg`,
              styles.uiProgressSvg,
            )}
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 100 100"
          >
            {variant.bufferPalette && variant.value === null && (
              <circle
                className={cx(
                  'ui-progress__circle-buffer',
                  variant.classNameRoot && `${variant.classNameRoot}__circle-buffer`,
                  styles.uiProgressCircle,
                  styles.uiProgressCircleBuffer,
                )}
                cx="50%"
                cy="50%"
                r={50 - (variant.thickness ?? 1) * 10}
              />
            )}

            <circle
              className={cx(
                'ui-progress__circle',
                variant.classNameRoot && `${variant.classNameRoot}__circle`,
                styles.uiProgressCircle,
                variant.value !== null && !ready && styles.uiProgressCircleInitial,
              )}
              cx="50%"
              cy="50%"
              r={50 - (variant.thickness ?? 1) * 10}
            />
          </svg>
        </UtilSlot>

        <UtilSlot slot="content">{variant.children}</UtilSlot>
      </AppLayout>
    </div>
  )
}
