import { UIBox, UIProgress } from '@gnowth/lib-react'
import { useIsFetching } from '@tanstack/react-query'
import { FunctionComponent } from 'react'

export const ViewProgressGlobal: FunctionComponent = () => {
  const isFetching = useIsFetching()

  return <UIBox minHeight="0.25rem">{!!isFetching && <UIProgress size="xxs" variant="horizontal" />}</UIBox>
}
