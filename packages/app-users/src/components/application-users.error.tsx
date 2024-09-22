import { LayoutSection, UIButton, UITypography } from '@gnowth/lib-react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  error: Error
  reset: () => void
}

export const ApplicationUsersError: FunctionComponent<Props> = (props) => {
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
