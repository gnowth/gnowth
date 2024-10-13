import { FunctionComponent } from 'react'

export type PropsInputTree = {
  as?: string
  name?: string
}

export const InputTree: FunctionComponent<PropsInputTree> = (props) => (
  <input className="input-tree" data-testid="view-input-tree" name={props.name} />
)
