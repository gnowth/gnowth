import type {
  PropsData,
  SystemBox,
  SystemPalette,
  SystemSpace,
  SystemTypography,
  SystemWidth,
} from '@gnowth/lib-types'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  Theme,
  cx,
  systemBox,
  systemCompose,
  systemColorFromPalette,
  systemSpace,
  systemTypography,
  systemWidth,
} from '@gnowth/lib-theme'
import { TokenLength } from '@gnowth/lib-token'
import { guardString } from '@gnowth/lib-utils'

import type { ChangeEventHandler } from './use-value'
import { useValue } from './use-value'

interface ComponentProps {
  className?: string
  disabled?: boolean
  id?: string
  name?: string
  onChange?: ChangeEventHandler<string>
  value?: string
}

type SystemInputText = SystemBox & SystemPalette & SystemSpace & SystemTypography & SystemWidth

export interface VariantInputText extends SystemInputText {
  as?: React.ComponentType<ComponentProps> | string
  boxVariant?: string
  boxVariantNamespace?: string
  type?: string
  typographyVariant?: string
  typographyVariantNamespace?: string
}

export interface PropsInputText extends VariantInputText, PropsData<string> {
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: VariantInputText | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({
  inputText: systemCompose<PropsInputText>(
    systemBox(),
    systemColorFromPalette(),
    systemSpace(),
    systemTypography(),
    systemWidth(),
  ),
})

const definitions = Theme.makeDefinitions(['', 'box', 'typography'])

const propsDefault = {
  as: 'input',
  boxVariant: 'input',
  boxVariantNamespace: 'systemBox',
  type: 'text',
  typographyVariant: 'input',
  typographyVariantNamespace: 'uiTypography',
  variant: 'input',
  variantNamespace: 'inputText',
  width: TokenLength.full,
}

export const InputText: React.FunctionComponent<PropsInputText> = (props) => {
  const value = useValue(props, '')
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariantByDefinitions(definitions, props, propsDefault)
  const styles = makeStyles(variant, theme)

  return React.createElement(variant.as || 'input', {
    className: cx(
      'input-text',
      guardString(variant.variant) && `input-text--${variant.variant}`,
      variant.className,
      styles.inputText,
    ),
    disabled: variant.disabled,
    id: variant.id,
    name: value.name,
    onChange: value.onChange,
    value: value.value,
  })
}
