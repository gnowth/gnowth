import type { FunctionComponent } from 'react'

export interface PropsInputList {
  as?: string
  name?: string
}

export const InputList: FunctionComponent<PropsInputList> = (props) => (
  <input className="input-list" data-testid="view-input-list" name={props.name} />
)
