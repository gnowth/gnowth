import type { SystemType } from '@gnowth/lib-theme'
import type { PropsData } from '@gnowth/lib-data'
import type { ComponentType, FunctionComponent } from 'react'
import { createElement } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBox,
  systemCompose,
  systemColorFromPalette,
  systemSpace,
  systemTypography,
  systemWidth,
  themeDefinitionsMake,
  themeStylesMake,
} from '@gnowth/lib-theme'
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

const inputText = systemCompose(
  systemBox(),
  systemColorFromPalette(),
  systemSpace(),
  systemTypography(),
  systemWidth(),
)

export interface VariantInputText extends SystemType<typeof inputText> {
  as?: ComponentType<ComponentProps> | string
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

const makeStyles = themeStylesMake({ inputText })
const definitions = themeDefinitionsMake(['', 'box', 'typography'])

const propsDefault: Partial<PropsInputText> = {
  as: 'input',
  boxVariant: 'input',
  boxVariantNamespace: 'systemBox',
  type: 'text',
  typographyVariant: 'input',
  typographyVariantNamespace: 'uiTypography',
  variant: 'input',
  variantNamespace: 'inputText',
  width: 'full',
}

export const InputText: FunctionComponent<PropsInputText> = (props) => {
  const value = useValue(props, '')
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariantByDefinitions(definitions, props, propsDefault)
  const styles = makeStyles(variant, theme)

  return createElement(variant.as || 'input', {
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
