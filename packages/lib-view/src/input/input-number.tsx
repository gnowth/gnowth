import type { FunctionComponent } from 'react'

export interface PropsInputNumber {
  as?: string
  name?: string
}

export const InputNumber: FunctionComponent<PropsInputNumber> = (props) => (
  <input className="input-number" name={props.name} />
)
