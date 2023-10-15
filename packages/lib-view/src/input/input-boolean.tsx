import type { SystemType, TokenIconSize } from '@gnowth/lib-theme'
import type { PropsData } from '@gnowth/lib-data'
import type { ComponentType, FunctionComponent } from 'react'
import { useRef, useCallback } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { cx, systemSpace, themeStylesMake } from '@gnowth/lib-theme'
import { UtilNamespaced, guardString } from '@gnowth/lib-utils'

import { UIIcon, PropsUIIcon } from '../ui/ui-icon'
import type { ChangeEventHandler } from './use-value'
import { useValue } from './use-value'

const inputBoolean = systemSpace()

export interface VariantInputBoolean extends SystemType<typeof inputBoolean> {
  as?: string
  icon?: ComponentType<PropsUIIcon> | string
  iconClassName?: string
  iconHidden?: boolean
  iconSize?: TokenIconSize
  iconValueFalse?: string
  iconValueNull?: string
  iconValueTrue?: string
  iconVariant?: string
  inputClassName?: string
  inputType?: string
}

export interface PropsInputBoolean extends VariantInputBoolean, PropsData<boolean | null> {
  className?: string
  classNameRoot?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: VariantInputBoolean | string
  variantNamespace?: string
  variants?: UtilNamespaced<VariantInputBoolean>
}

const makeStyles = themeStylesMake({
  inputBoolean,
  inputBooleanClass: `
    display: inline-block;
    line-height: 0;
    position: relative;
    width: fit-content;
  `,
  inputBooleanInput: `
    bottom: 0;
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  `,
})

const variants = {
  checkbox: {
    iconValueFalse: 'checkbox',
    iconValueNull: 'checkboxIntermediate',
    iconValueTrue: 'checkboxChecked',
    inputType: 'checkbox',
  },

  radio: {
    iconValueFalse: 'radio',
    iconValueTrue: 'radioChecked',
    inputType: 'radio',
  },
}

const propsDefault: Partial<PropsInputBoolean> = {
  iconSize: 'sm',
  inputType: 'checkbox',
  variant: 'checkbox',
  variantNamespace: 'inputBoolean',
  variants,
}

function iconValue(props: PropsInputBoolean, value?: boolean | null) {
  if (value === null) return props.iconValueNull || props.iconValueFalse

  return value ? props.iconValueTrue : props.iconValueFalse
}

export const InputBoolean: FunctionComponent<PropsInputBoolean> = (props) => {
  const { name, onChange, value } = useValue(props, false)
  const theme = useAppTheme()
  const refInput = useRef<HTMLInputElement>(null)
  const handleChange = useCallback<ChangeEventHandler<string>>(
    ({ target }) => onChange?.({ target: { value: target.checked ?? false } }),
    [onChange],
  )

  if (props.hidden) return null

  if (refInput.current) {
    refInput.current.indeterminate = value === null
  }

  const variant = theme.getVariant(props, propsDefault)
  const styles = makeStyles(variant, theme)
  const ComponentIcon = theme.getComponent({ component: variant.icon }) || UIIcon

  return (
    <div
      className={cx(
        'input-boolean',
        guardString(variant.variant) && `input-boolean--${variant.variant}`,
        variant.className,
        styles.inputBooleanClass,
        styles.inputBoolean,
      )}
      id={variant.id}
    >
      <ComponentIcon
        className={cx(
          'input-boolean__icon',
          variant.classNameRoot && `${variant.classNameRoot}__icon`,
          variant.iconClassName,
        )}
        id={variant.id && `${variant.id}__icon`}
        size={variant.iconSize}
        slot="icon"
        value={iconValue(variant, value)}
        variant={variant.iconVariant}
      />

      <input
        checked={!!value}
        className={cx(
          'input-boolean__input',
          variant.classNameRoot && `${variant.classNameRoot}__icon`,
          variant.inputClassName,
          styles.inputBooleanInput,
        )}
        disabled={variant.disabled}
        name={name}
        onChange={handleChange}
        ref={refInput}
        slot="input"
        type={variant.inputType}
      />
    </div>
  )
}
