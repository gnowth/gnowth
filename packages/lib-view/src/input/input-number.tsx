import type { FunctionComponent } from 'react'

export interface VariantInputNumber {
  as?: string
}

export interface PropsInputNumber {
  name?: string
}

export const InputNumber: FunctionComponent<PropsInputNumber> = (props) => (
  <input className="input-number" name={props.name} />
)
