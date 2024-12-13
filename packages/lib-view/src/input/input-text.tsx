import { useAppTheme } from '@gnowth/lib-application'
import { PropsData } from '@gnowth/lib-data'
import {
  cx,
  systemBox,
  systemColorFromPalette,
  systemCompose,
  systemLayout,
  systemSpace,
  SystemType,
  systemTypography,
  themeMakeStyles,
  ThemeVariants,
} from '@gnowth/lib-theme'
import { ComponentType, createElement, FunctionComponent } from 'react'
import * as R from 'remeda'

import { ChangeEventHandler, useValue } from './use-value'

export type PropsInputText = PropsData<string> &
  SystemType<typeof inputText> & {
    as?: ComponentType<ComponentProps> | string
    boxVariant?: string
    boxVariantNamespace?: string
    className?: string
    hidden?: boolean
    id?: string
    placeholder?: string
    slot?: string
    type?: string
    typographyVariant?: string
    typographyVariantNamespace?: string
    variant?: PropsInputText | string
    variantComposition?: string[]
    variantNamespace?: string
    variants?: ThemeVariants<PropsInputText>
  }
type ComponentProps = {
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
  systemLayout(),
  systemSpace(),
  systemTypography(),
)
const makeStyles = themeMakeStyles({ inputText })
const variants: ThemeVariants<PropsInputText> = {
  text: {
    height: 'md',
    paddingLeft: 'sm',
    paddingRight: 'sm',
    width: 'full',
  },
}
const propsDefault: Partial<PropsInputText> = {
  as: 'input',
  boxVariant: 'input',
  boxVariantNamespace: 'systemBox',
  type: 'text',
  typographyVariant: 'input',
  typographyVariantNamespace: 'uiTypography',
  variant: 'text',
  variantComposition: ['box', 'typography'],
  variantNamespace: 'inputText',
  variants,
}

export const InputText: FunctionComponent<PropsInputText> = (props) => {
  const value = useValue(props, '')
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return createElement((propsVariant.as ?? 'input') as 'input', {
    className: cx(
      'input-text',
      R.isString(propsVariant.variant) && `input-text--${propsVariant.variant}`,
      propsVariant.className,
      styles.inputText,
    ),
    'data-testid': 'view-input-text',
    disabled: propsVariant.disabled,
    id: propsVariant.id,
    name: value.name,
    onChange: value.onChange,
    placeholder: propsVariant.placeholder,
    type: propsVariant.type,
    value: value.value,
  })
}
