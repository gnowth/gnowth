import { useAnimationDelayReady } from '@gnowth/lib-animation'
import { AppLayout, PropsLayout, useAppTheme } from '@gnowth/lib-application'
import { PropsDataReadonly } from '@gnowth/lib-data'
import {
  System,
  SystemType,
  Theme,
  ThemeVariants,
  TokenColorWeight,
  TokenSize,
  cx,
  keyframes,
  systemColorFromPalette,
  systemCompose,
  systemDisplay,
  systemSpace,
  themeCreateStyles,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { ComponentType, FunctionComponent, ReactNode } from 'react'
import * as R from 'remeda'

import { UtilSlot } from '../util/util-slot'

const stylesLayout = themeCreateStyles({
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

const LayoutSuperImpose: FunctionComponent<PropsLayout> = (props) => (
  <UtilSlot.Provider slots={props.children}>
    <div className={cx(props.className, props.classNamespace, stylesLayout.layoutContainer)} id={props.id}>
      <UtilSlot.Test test="progress">
        <div
          className={cx(
            stylesLayout.layoutProgress,
            props.classNamespace && `${props.classNamespace}--progress`,
          )}
          id={props.id && `${props.id}--progress`}
        >
          <UtilSlot.Content name="progress" />
        </div>
      </UtilSlot.Test>

      <UtilSlot.Test test="content">
        <div
          className={cx(
            stylesLayout.layoutContent,
            props.classNamespace && `${props.classNamespace}--content`,
          )}
          id={props.id && `${props.id}--content`}
        >
          <UtilSlot.Content name="content" />
        </div>
      </UtilSlot.Test>
    </div>
  </UtilSlot.Provider>
)

export interface PropsUIProgress
  extends PropsDataReadonly<null | number>,
    SystemType<ReturnType<typeof systemColorFromPalette>>,
    SystemType<typeof uiProgress> {
  as?: string
  bufferPalette?: string
  bufferPaletteForContrast?: boolean
  bufferPaletteWeight?: TokenColorWeight
  children?: ReactNode
  className?: string
  classNamespace?: string
  hidden?: boolean
  layout?: ComponentType<PropsLayout> | string
  layoutProps?: Record<string, unknown>
  layoutVariant?: string
  size?: TokenSize
  slot?: string
  thickness?: number
  transitionDuration?: string
  valueMax?: number
  variant?: PropsUIProgress | string
  variantNamespace?: string
  variants?: ThemeVariants<PropsUIProgress>
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

const systemSize: System<{ size?: TokenSize }> = (props, theme) => {
  if (!props.size) {
    return {}
  }
  const size = theme.getScaleItem({ scale: 'iconSize', scaleToken: props.size })
  return { height: size, width: size }
}

const uiProgress = systemCompose(systemDisplay(), systemSpace(), systemSize)
const makeStyles = themeMakeStyles({
  uiProgress,
  uiProgressCircle: (props: PropsUIProgress, theme: Theme) => ({
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

  uiProgressCircleBuffer: (props: PropsUIProgress, theme: Theme) => ({
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
const variants: ThemeVariants<PropsUIProgress> = {
  page: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'xl',
    size: 'xxl',
  },
}
const propsDefault: Partial<PropsUIProgress> = {
  bufferPalette: 'primary',
  display: 'inline-block',
  layout: LayoutSuperImpose,
  palette: 'primary',
  size: 'xs',
  thickness: 1,
  transitionDuration: '225ms',
  value: null,
  // valueInitial: 0,
  valueMax: 100,
  variantNamespace: 'uiProgress',
  variants,
}

// TODO can keyframes be extracted in to an animation library or into the theme
// TODO: delay cause animation synchronisation issue
// TODO should props, propsDefault, context, state be generalize in a type?
// TODO: add animation if a number starts from 0 to number?
// TODO: fix alignment and padding
export const UIProgress: FunctionComponent<PropsUIProgress> = (props) => {
  const ready = useAnimationDelayReady()
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <div
      className={cx(
        'ui-progress',
        R.isString(propsVariant.variant) && `ui-progress--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiProgress,
      )}
      data-testid="view-ui-progress"
      id={propsVariant.id}
    >
      <AppLayout
        classNamespace="ui-progress--layout"
        id={propsVariant.id && `${propsVariant.id}--layout`}
        layout={propsVariant.layout}
        layoutProps={propsVariant.layoutProps}
        layoutVariant={propsVariant.layoutVariant}
      >
        <UtilSlot slot="progress">
          <svg
            className={cx(
              'ui-progress--svg',
              propsVariant.classNamespace && `${propsVariant.classNamespace}--svg`,
              styles.uiProgressSvg,
            )}
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 100 100"
          >
            {propsVariant.bufferPalette && propsVariant.value === null && (
              <circle
                className={cx(
                  'ui-progress--circle-buffer',
                  propsVariant.classNamespace && `${propsVariant.classNamespace}--circle-buffer`,
                  styles.uiProgressCircle,
                  styles.uiProgressCircleBuffer,
                )}
                cx="50%"
                cy="50%"
                r={50 - (propsVariant.thickness ?? 1) * 10}
              />
            )}

            <circle
              className={cx(
                'ui-progress--circle',
                propsVariant.classNamespace && `${propsVariant.classNamespace}--circle`,
                styles.uiProgressCircle,
                propsVariant.value !== null && !ready && styles.uiProgressCircleInitial,
              )}
              cx="50%"
              cy="50%"
              r={50 - (propsVariant.thickness ?? 1) * 10}
            />
          </svg>
        </UtilSlot>

        <UtilSlot slot="content">{propsVariant.children}</UtilSlot>
      </AppLayout>
    </div>
  )
}
