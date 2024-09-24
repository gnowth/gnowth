import { FunctionComponent } from 'react'

import { LayoutContent } from '../layout/layout-content'
import { UITypography } from './ui-typography'

type Props = {
  as?: string
  value?: Error | Error[] | null
}

export const UIError: FunctionComponent<Props> = (props) => {
  if (!props.value) return null

  return (
    <LayoutContent data-testid="view-ui-error">
      {Array.isArray(props.value) &&
        props.value.map((error) => <UITypography key={error.message} value={error.message} />)}

      {!Array.isArray(props.value) && <UITypography value={props.value.message} />}
    </LayoutContent>
  )
}
