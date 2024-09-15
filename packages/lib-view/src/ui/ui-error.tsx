import { ReactElement } from 'react'

import { LayoutContent } from '../layout/layout-content'
import { UITypography } from './ui-typography'

export interface PropsUIError {
  as?: string
  value?: Error | Error[] | null
}

export function UIError(props: PropsUIError): ReactElement | null {
  if (!props.value) return null

  return (
    <LayoutContent data-testid="view-ui-error">
      {Array.isArray(props.value) &&
        props.value.map((error) => <UITypography key={error.message} value={error.message} />)}

      {!Array.isArray(props.value) && <UITypography value={props.value.message} />}
    </LayoutContent>
  )
}
