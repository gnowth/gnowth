import type { SystemType, ThemeVariants } from '@gnowth/lib-theme'
import type { FunctionComponent } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  keyframes,
  systemBox,
  systemCompose,
  systemLayout,
  systemSpace,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import * as R from 'remeda'

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`

export interface PropsUISkeleton extends SystemType<typeof uiSkeleton> {
  as?: string
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsUISkeleton | string
  variantNamespace?: string
  variants?: ThemeVariants<PropsUISkeleton>
}
const uiSkeleton = systemCompose(systemBox(), systemLayout(), systemSpace())
const makeStyles = themeMakeStyles({
  animationClass: `
    animation: ${pulse} 2s ease-in-out 0.5s infinite;
    aspect-ratio: 1/1;
    background-color: rgba(0, 0, 0, 0.11);
  `,
  uiSkeleton,
})
const variants: ThemeVariants<PropsUISkeleton> = {
  circular: (props) => ({
    borderRadius: '50%',
    width: props.height,
  }),
  rectangular: {},
  rounded: { borderRadius: '4px' },
}
const propsDefault: Partial<PropsUISkeleton> = {
  variant: 'rectangular',
  variantNamespace: 'uiSkeleton',
  variants,
  width: 'full',
}

export const UISkeleton: FunctionComponent<PropsUISkeleton> = (props) => {
  const theme = useAppTheme()
  if (props.hidden) return null
  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <div
      className={cx(
        'ui-skeleton',
        R.isString(propsVariant.variant) && `ui-skeleton--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiSkeleton,
        styles.animationClass,
      )}
    />
  )
}
