import type { FunctionComponent } from 'react'

import { LayoutSection, UIButton, UITypography, useTranslation } from '@gnowth/lib-react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'

type Props = {
  error: Error
  reset: () => void
}

export const AppError: FunctionComponent<Props> = (props) => {
  const { t } = useTranslation('other')
  const { reset } = useQueryErrorResetBoundary()

  return (
    <LayoutSection layout="flex" variant="container">
      <UITypography as="span" value={t('There was an error!')} />

      <UIButton
        onClick={() => {
          reset()
          props.reset()
        }}
        textValue={t('Try again')}
      />
    </LayoutSection>
  )
}
