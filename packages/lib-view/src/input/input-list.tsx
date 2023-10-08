import type { FunctionComponent } from 'react'

export interface VariantInputList {
  as?: string
}

export interface PropsInputList {
  name?: string
}

export const InputList: FunctionComponent<PropsInputList> = (props) => (
  <input className="input-list" name={props.name} />
)
