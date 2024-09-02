import type { FunctionComponent } from 'react'

import { Button } from '@chakra-ui/react'
import { LayoutSection } from '@gnowth/app-users'
import { UITypography } from '@gnowth/lib-react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

type Props = {
  error: Error
  reset: () => void
}

export const AppError: FunctionComponent<Props> = (props) => {
  const { t } = useTranslation('other')
  const { reset } = useQueryErrorResetBoundary()

  return (
    <LayoutSection>
      <UITypography as="span" value={t('There was an error!')} />

      <Button
        ml="4"
        onClick={() => {
          reset()
          props.reset()
        }}
      >
        {t('Try again')}
      </Button>
    </LayoutSection>
  )
}
