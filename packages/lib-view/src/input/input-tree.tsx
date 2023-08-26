import React from 'react'

export interface VariantInputTree {
  as?: string
}

export interface PropsInputTree {
  name?: string
}

const InputTree: React.FunctionComponent<PropsInputTree> = (props) => (
  <input className="input-tree" name={props.name} />
)

export default InputTree
