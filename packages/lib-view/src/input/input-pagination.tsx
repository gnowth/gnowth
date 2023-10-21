import type { FunctionComponent } from 'react'

export interface PropsInputPagination {
  as?: string
  name?: string
}

export const InputPagination: FunctionComponent<PropsInputPagination> = (props) => (
  <input className="input-pagination" name={props.name} />
)
