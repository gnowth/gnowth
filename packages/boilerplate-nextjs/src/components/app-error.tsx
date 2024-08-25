import type { FunctionComponent } from 'react'

import { Button, Text } from '@chakra-ui/react'
import { LayoutSection } from '@gnowth/app-users'
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
      <Text as="span">{t('There was an error!')}</Text>

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
