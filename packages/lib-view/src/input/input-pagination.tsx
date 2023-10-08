import type { FunctionComponent } from 'react'

export interface VariantInputPagination {
  as?: string
}

export interface PropsInputPagination {
  name?: string
}

export const InputPagination: FunctionComponent<PropsInputPagination> = (props) => (
  <input className="input-pagination" name={props.name} />
)
