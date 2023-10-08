import type { SystemType } from '@gnowth/lib-theme'
import type { PropsDataReadonly } from '@gnowth/lib-data'
import type { FunctionComponent } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  Theme,
  cx,
  systemCompose,
  systemColorFromPalette,
  systemSpace,
  systemTypography,
} from '@gnowth/lib-theme'
import { guardString } from '@gnowth/lib-utils'

const uiLabel = systemCompose(systemColorFromPalette(), systemSpace(), systemTypography())

export interface VariantUILabel extends SystemType<typeof uiLabel> {
  typographyVariant?: string
  typographyVariantNamespace?: string
}

export interface PropsUILabel extends VariantUILabel, PropsDataReadonly<string> {
  className?: string
  hidden?: boolean
  slot?: string
  variant?: VariantUILabel | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({ uiLabel })

const definitions = Theme.makeDefinitions(['', 'typography'])

const propsDefault = {
  typographyVariant: 'label',
  typographyVariantNamespace: 'uiTypography',
}

export const UILabel: FunctionComponent<PropsUILabel> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariantByDefinitions(definitions, props, propsDefault)
  const styles = makeStyles(variant, theme)

  return (
    <label
      className={cx(
        'ui-label',
        guardString(variant.variant) && `ui-label--${variant.variant}`,
        variant.className,
        styles.uiLabel,
      )}
      htmlFor={props.id}
    >
      {props.value}
    </label>
  )
}
