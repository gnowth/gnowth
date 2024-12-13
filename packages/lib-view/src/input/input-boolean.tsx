import { useAppTheme } from '@gnowth/lib-application'
import { PropsData } from '@gnowth/lib-data'
import { cx, systemSpace, SystemType, themeMakeStyles, TokenSize } from '@gnowth/lib-theme'
import { UtilNamespaced } from '@gnowth/lib-utils'
import { ComponentType, FunctionComponent, useCallback, useRef } from 'react'
import * as R from 'remeda'

import { PropsUIIcon, UIIcon } from '../ui/ui-icon'
import { ChangeEventHandler, useValue } from './use-value'

export type PropsInputBoolean = PropsData<boolean | null> &
  SystemType<typeof inputBoolean> & {
    as?: string
    className?: string
    classNamespace?: string
    hidden?: boolean
    icon?: ComponentType<PropsUIIcon> | string
    iconClassName?: string
    iconHidden?: boolean
    iconSize?: TokenSize
    iconValueFalse?: string
    iconValueNull?: string
    iconValueTrue?: string
    iconVariant?: string
    id?: string
    inputClassName?: string
    inputType?: string
    slot?: string
    variant?: PropsInputBoolean | string
    variantNamespace?: string
    variants?: UtilNamespaced<PropsInputBoolean>
  }

const inputBoolean = systemSpace()
const makeStyles = themeMakeStyles({
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
  if (value === null) return props.iconValueNull ?? props.iconValueFalse

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

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)
  const ComponentIcon = theme.getComponent({ component: propsVariant.icon }) || UIIcon

  return (
    <div
      className={cx(
        'input-boolean',
        R.isString(propsVariant.variant) && `input-boolean--${propsVariant.variant}`,
        propsVariant.className,
        styles.inputBooleanClass,
        styles.inputBoolean,
      )}
      data-testid="view-input-boolean"
      id={propsVariant.id}
    >
      <ComponentIcon
        className={cx(
          'input-boolean--icon',
          propsVariant.classNamespace && `${propsVariant.classNamespace}--icon`,
          propsVariant.iconClassName,
        )}
        id={propsVariant.id && `${propsVariant.id}--icon`}
        size={propsVariant.iconSize}
        slot="icon"
        value={iconValue(propsVariant, value)}
        variant={propsVariant.iconVariant}
      />

      <input
        checked={!!value}
        className={cx(
          'input-boolean--input',
          propsVariant.classNamespace && `${propsVariant.classNamespace}--icon`,
          propsVariant.inputClassName,
          styles.inputBooleanInput,
        )}
        disabled={propsVariant.disabled}
        name={name}
        onChange={handleChange}
        ref={refInput}
        slot="input"
        type={propsVariant.inputType}
      />
    </div>
  )
}
