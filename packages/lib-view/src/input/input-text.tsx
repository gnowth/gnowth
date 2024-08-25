import type { PropsData } from '@gnowth/lib-data'
import type { SystemType } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBox,
  systemColorFromPalette,
  systemCompose,
  systemSpace,
  systemTypography,
  systemWidth,
  themeDefinitionsMake,
  themeStylesMake,
} from '@gnowth/lib-theme'
import { createElement } from 'react'
import * as R from 'remeda'

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
export interface PropsInputText extends SystemType<typeof inputText>, PropsData<string> {
  as?: ComponentType<ComponentProps> | string
  boxVariant?: string
  boxVariantNamespace?: string
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  type?: string
  typographyVariant?: string
  typographyVariantNamespace?: string
  variant?: PropsInputText | string
  variantNamespace?: string
}

const inputText = systemCompose(
  systemBox(),
  systemColorFromPalette(),
  systemSpace(),
  systemTypography(),
  systemWidth(),
)
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

  const propsVariant = theme.getPropsVariantByDefinitions(definitions, props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return createElement(propsVariant.as || 'input', {
    className: cx(
      'input-text',
      R.isString(propsVariant.variant) && `input-text--${propsVariant.variant}`,
      propsVariant.className,
      styles.inputText,
    ),
    disabled: propsVariant.disabled,
    id: propsVariant.id,
    name: value.name,
    onChange: value.onChange,
    value: value.value,
  })
}
