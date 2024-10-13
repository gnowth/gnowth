import { FunctionComponent } from 'react'

export type PropsInputCascader = {
  as?: string
  name?: string
}

// Note: see ant design
export const InputCascader: FunctionComponent<PropsInputCascader> = (props) => (
  <input className="input-cascader" data-testid="view-input-cascader" name={props.name} />
)
