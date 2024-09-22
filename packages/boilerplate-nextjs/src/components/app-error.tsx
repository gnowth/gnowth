import { LayoutSection, UIButton, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

type Props = {
  error: Error
  reset: () => void
}

export const AppError: FunctionComponent<Props> = (props) => {
  return (
    <LayoutSection layout="flex" variant="container">
      <UITypography as="span" value="There was an error!" />

      <UIButton onClick={() => props.reset()} textValue="Try again" />
    </LayoutSection>
  )
}
