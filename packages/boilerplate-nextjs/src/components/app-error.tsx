import type { FunctionComponent } from 'react'
import { LayoutSection } from '@app/core'
import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useQueryErrorResetBoundary } from 'react-query'

type Props = {
  error: Error
  reset: () => void
}

const AppError: FunctionComponent<Props> = (props) => {
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

export default AppError
