import type { VariantType } from '@gnowth/lib-theme'
import type { PropsInputBoolean } from '@gnowth/lib-view'

export const checkbox: VariantType<PropsInputBoolean> = {
  iconValueFalse: 'checkbox',
  iconValueNull: 'checkboxIntermediate',
  iconValueTrue: 'checkboxChecked',
}

export const radio: VariantType<PropsInputBoolean> = {
  iconValueFalse: 'radio',
  iconValueTrue: 'radioChecked',
}
