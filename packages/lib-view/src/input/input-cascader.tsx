import React from 'react'

export interface VariantInputCascader {
  as?: string
}

export interface PropsInputCascader {
  name?: string
}

// Note: see ant design
export const InputCascader: React.FunctionComponent<PropsInputCascader> = (props) => (
  <input className="input-cascader" name={props.name} />
)
