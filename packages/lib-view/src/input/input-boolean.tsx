import type { PropsData, SystemSpace } from '@gnowth/lib-types'
import _ from 'lodash'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { Theme, cx, systemSpace } from '@gnowth/lib-theme'
import { TokenIconSize } from '@gnowth/lib-token'

import type { ChangeEventHandler } from './use-value'
import { UIIcon, PropsUIIcon } from '../ui/ui-icon'
import { useValue } from './use-value'

type SystemInputBoolean = SystemSpace

export interface VariantInputBoolean extends SystemInputBoolean {
  as?: string
  icon?: React.ComponentType<PropsUIIcon> | string
  iconClassName?: string
  iconHidden?: boolean
  iconSize?: string | number
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
}

const makeStyles = Theme.makeStyles({
  inputBoolean: systemSpace(),
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

const variantLocals = {
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

const propsDefault = {
  iconSize: TokenIconSize.sm,
  inputType: 'checkbox',
  variantLocals,
  variant: 'checkbox',
  variantNamespace: 'inputBoolean',
}

function iconValue(props: PropsInputBoolean, value?: boolean | null) {
  if (value === null) return props.iconValueNull || props.iconValueFalse

  return value ? props.iconValueTrue : props.iconValueFalse
}

export const InputBoolean: React.FunctionComponent<PropsInputBoolean> = (props) => {
  const { name, onChange, value } = useValue(props, false)
  const theme = useAppTheme()
  const refInput = React.useRef<HTMLInputElement>(null)
  const handleChange = React.useCallback<ChangeEventHandler<string>>(
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
        _.isString(variant.variant) && `input-boolean--${variant.variant}`,
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
        className={cx(
          'input-boolean__input',
          variant.classNameRoot && `${variant.classNameRoot}__icon`,
          variant.inputClassName,
          styles.inputBooleanInput,
        )}
        checked={!!value}
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
