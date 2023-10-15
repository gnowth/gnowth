import type { SystemType, TokenIconSize } from '@gnowth/lib-theme'
import type { PropsDataReadonly } from '@gnowth/lib-data'
import type { FunctionComponent } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemColorFromPalette, systemCompose, systemSpace, themeStylesMake } from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'

interface ComponentProps {
  className?: string
  color?: string
  id?: string
  size?: string
}
const uiIcon = systemCompose(systemColorFromPalette(), systemSpace())

export interface VariantUIIcon extends SystemType<typeof uiIcon> {
  mediaPrintDisabled?: boolean
}

// TODO: fix icon size. svg height/width supports number only
export interface PropsUIIcon extends VariantUIIcon, PropsDataReadonly<string> {
  className?: string
  hidden?: boolean
  size?: TokenIconSize
  slot?: string
  variant?: VariantUIIcon | string
  variantNamespace?: string
}

const makeStyles = themeStylesMake({ uiIcon })

const propsDefault: Partial<PropsUIIcon> = {
  palette: 'textPrimary',
  size: 'xs',
  variantNamespace: 'uiIcon',
}

export const UIIcon: FunctionComponent<PropsUIIcon> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)
  const Component = theme.getComponent<ComponentProps>({
    component: variant.value || undefined,
    componentNamespace: 'icon',
  })

  if (!Component) return null

  return (
    <Component
      className={cx(
        'ui-icon',
        guardString(variant.variant) && `ui-icon--${variant.variant}`,
        variant.className,
        styles.uiIcon,
      )}
      id={variant.id}
      size={theme.getScaleItem({ scale: 'iconsize', scaleToken: variant.size })}
    />
  )
}
