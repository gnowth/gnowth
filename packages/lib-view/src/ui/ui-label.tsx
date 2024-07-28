import type { PropsDataReadonly } from '@gnowth/lib-data'
import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemColorFromPalette,
  systemCompose,
  systemSpace,
  systemTypography,
  themeDefinitionsMake,
  themeStylesMake,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'

export interface PropsUILabel extends SystemType<typeof uiLabel>, PropsDataReadonly<string> {
  className?: string
  hidden?: boolean
  slot?: string
  typographyVariant?: string
  typographyVariantNamespace?: string
  variant?: PropsUILabel | string
  variantNamespace?: string
}

const uiLabel = systemCompose(systemColorFromPalette(), systemSpace(), systemTypography())
const makeStyles = themeStylesMake({ uiLabel })
const definitions = themeDefinitionsMake(['', 'typography'])
const propsDefault: Partial<PropsUILabel> = {
  typographyVariant: 'label',
  typographyVariantNamespace: 'uiTypography',
}

export const UILabel: FunctionComponent<PropsUILabel> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariantByDefinitions(definitions, props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <label
      className={cx(
        'ui-label',
        guardString(propsVariant.variant) && `ui-label--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiLabel,
      )}
      htmlFor={props.id}
    >
      {props.value}
    </label>
  )
}
