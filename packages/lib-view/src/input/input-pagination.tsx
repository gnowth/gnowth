import React from 'react'

export interface VariantInputPagination {
  as?: string
}

export interface PropsInputPagination {
  name?: string
}

const InputPagination: React.FunctionComponent<PropsInputPagination> = (props) => (
  <input className="input-pagination" name={props.name} />
)

export default InputPagination
