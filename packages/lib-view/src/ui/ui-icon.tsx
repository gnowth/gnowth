import type { PropsDataReadonly, SystemPalette, SystemSpace } from '@gnowth/lib-types'
import type { FunctionComponent } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { Theme, cx, systemColorFromPalette, systemCompose, systemSpace } from '@gnowth/lib-theme'
import { TokenIconSize } from '@gnowth/lib-token'
import { guardString } from '@gnowth/lib-utils'

interface ComponentProps {
  className?: string
  color?: string
  id?: string
  size?: string
}

export interface VariantUIIcon extends SystemSpace {
  mediaPrintDisabled?: boolean
}

// TODO: fix icon size. svg height/width supports number only
export interface PropsUIIcon extends VariantUIIcon, SystemPalette, PropsDataReadonly<string> {
  className?: string
  hidden?: boolean
  size?: string | number
  slot?: string
  variant?: VariantUIIcon | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({
  uiIcon: systemCompose(systemColorFromPalette(), systemSpace()),
})

const propsDefault = {
  palette: 'textPrimary',
  size: TokenIconSize.xs,
  variantNamespace: 'uiIcon',
}

export const UIIcon: FunctionComponent<PropsUIIcon> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)
  const Component = theme.getComponent<ComponentProps>({
    component: variant.value || undefined,
    namespace: 'icon',
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
      size={theme.getScaleItem({ scale: 'iconsize', token: variant.size })}
    />
  )
}
