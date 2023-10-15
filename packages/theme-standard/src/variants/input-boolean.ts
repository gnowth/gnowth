import type { VariantType } from '@gnowth/lib-theme'
import type { VariantInputBoolean } from '@gnowth/lib-view'

export const checkbox: VariantType<VariantInputBoolean> = {
  iconValueFalse: 'checkbox',
  iconValueNull: 'checkboxIntermediate',
  iconValueTrue: 'checkboxChecked',
}

export const radio: VariantType<VariantInputBoolean> = {
  iconValueFalse: 'radio',
  iconValueTrue: 'radioChecked',
}
