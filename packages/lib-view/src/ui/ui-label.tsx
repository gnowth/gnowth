import type { PropsDataReadonly, SystemPalette, SystemSpace, SystemTypography } from '@gnowth/lib-types'
import React from 'react'
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

type SystemUILabel = SystemPalette & SystemSpace & SystemTypography

export interface VariantUILabel extends SystemUILabel {
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

const makeStyles = Theme.makeStyles({
  uiLabel: systemCompose<PropsUILabel>(systemColorFromPalette(), systemSpace(), systemTypography()),
})

const definitions = Theme.makeDefinitions(['', 'typography'])

const propsDefault = {
  typographyVariant: 'label',
  typographyVariantNamespace: 'uiTypography',
}

export const UILabel: React.FunctionComponent<PropsUILabel> = (props) => {
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
