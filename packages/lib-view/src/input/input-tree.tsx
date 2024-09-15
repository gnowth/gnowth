import { FunctionComponent } from 'react'

export interface PropsInputTree {
  as?: string
  name?: string
}

export const InputTree: FunctionComponent<PropsInputTree> = (props) => (
  <input className="input-tree" data-testid="view-input-tree" name={props.name} />
)
