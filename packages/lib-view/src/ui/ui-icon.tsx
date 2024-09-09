import type { PropsDataReadonly } from '@gnowth/lib-data'
import type { SystemType, TokenSize } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemColorFromPalette, systemCompose, systemSpace, themeMakeStyles } from '@gnowth/lib-theme'
import * as R from 'remeda'

interface ComponentProps {
  className?: string
  color?: string
  'data-testid'?: string
  id?: string
  size?: string
}
// TODO: fix icon size. svg height/width supports number only
export interface PropsUIIcon extends SystemType<typeof uiIcon>, PropsDataReadonly<string> {
  className?: string
  components?: Record<string, ComponentType<ComponentProps>>
  hidden?: boolean
  mediaPrintDisabled?: boolean
  size?: TokenSize
  slot?: string
  variant?: PropsUIIcon | string
  variantNamespace?: string
}

const uiIcon = systemCompose(systemColorFromPalette(), systemSpace())
const makeStyles = themeMakeStyles({ uiIcon })
const propsDefault: Partial<PropsUIIcon> = {
  palette: 'textPrimary',
  size: 'xs',
  variantNamespace: 'uiIcon',
}

export const UIIcon: FunctionComponent<PropsUIIcon> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)
  const Component = theme.getComponent<ComponentProps>({
    component: propsVariant.value || undefined,
    componentNamespace: 'icon',
    components: propsVariant.components,
  })

  if (!Component) return null

  return (
    <Component
      className={cx(
        'ui-icon',
        R.isString(propsVariant.variant) && `ui-icon--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiIcon,
      )}
      data-testid="view-ui-icon"
      id={propsVariant.id}
      size={theme.getScaleItem({ scale: 'iconSize', scaleToken: propsVariant.size })}
    />
  )
}
