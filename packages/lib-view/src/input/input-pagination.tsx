import { FunctionComponent } from 'react'

export interface PropsInputPagination {
  as?: string
  name?: string
}

export const InputPagination: FunctionComponent<PropsInputPagination> = (props) => (
  <input className="input-pagination" data-testid="view-input-pagination" name={props.name} />
)
