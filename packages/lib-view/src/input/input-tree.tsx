import type { FunctionComponent } from 'react'

export interface VariantInputTree {
  as?: string
}

export interface PropsInputTree {
  name?: string
}

export const InputTree: FunctionComponent<PropsInputTree> = (props) => (
  <input className="input-tree" name={props.name} />
)
