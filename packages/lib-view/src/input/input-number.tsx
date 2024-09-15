import { FunctionComponent } from 'react'

export interface PropsInputNumber {
  as?: string
  name?: string
}

export const InputNumber: FunctionComponent<PropsInputNumber> = (props) => (
  <input className="input-number" data-testid="view-input-number" name={props.name} />
)
