import { FunctionComponent } from 'react'
import Select from 'react-select'

import { UIBox } from '../ui/ui-box'
import { ChangeEventHandler } from './use-value'

type Option = { label: string; value: unknown }
export type PropsInputSelect = {
  as?: string
  id?: string
  menuPlacement?: 'auto' | 'bottom' | 'top'
  name?: string
  onChange?: ChangeEventHandler<Option | null>
  options?: Option[]
  placeholder?: string
  value?: Option | null
}

export const InputSelect: FunctionComponent<PropsInputSelect> = (props) => {
  return (
    <UIBox className="input-select" data-testid="view-input-select">
      <Select
        menuPlacement={props.menuPlacement}
        name={props.name}
        onChange={(newValue) => props.onChange?.({ target: { value: newValue } })}
        options={props.options}
        placeholder={props.placeholder}
        value={props.value}
      />
    </UIBox>
  )
}
