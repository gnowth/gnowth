import type { SystemType, ThemeVariants } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemCompose,
  systemImage,
  systemSpace,
  systemTextAlign,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import * as R from 'remeda'

export interface PropsUIDivider extends SystemType<typeof uiDivider> {
  as?: string
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsUIDivider | string
  variantNamespace?: string
  variants?: ThemeVariants<PropsUIDivider>
}

const uiDivider = systemCompose(systemImage(), systemSpace(), systemTextAlign())
const makeStyles = themeMakeStyles({ uiDivider })
const variants: ThemeVariants<PropsUIDivider> = {
  horizontal: (props) => ({
    backgroundImage: `linear-gradient(${
      props.theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''
    }, ${props.theme.getPaletteColor({ palette: 'text', paletteWeight: '200' }) ?? ''})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '1px 1px',
  }),
}
const propsDefault: Partial<PropsUIDivider> = {
  textAlign: 'center',
  variant: 'horizontal',
  variantNamespace: 'uiDivider',
  variants,
}

export const UIDivider: FunctionComponent<PropsUIDivider> = (props) => {
  const theme = useAppTheme()
  if (props.hidden) return null
  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <div
      className={cx(
        'ui-divider',
        R.isString(propsVariant.variant) && `ui-divider--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiDivider,
      )}
      id={propsVariant.id}
    >
      {props.children}
    </div>
  )
}
