import React from 'react'

export interface VariantInputList {
  as?: string
}

export interface PropsInputList {
  name?: string
}

const InputList: React.FunctionComponent<PropsInputList> = (props) => (
  <input className="input-list" name={props.name} />
)

export default InputList
