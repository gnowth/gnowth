import { LayoutSection, UIButton, UITypography } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  error: Error
  reset: () => void
}

export const ApplicationRootError: FunctionComponent<Props> = (props) => {
  const { t } = useTranslation('other')

  return (
    <LayoutSection layout="flex" variant="container">
      <UITypography as="span" value={t('There was an error!')} />

      <UIButton onClick={() => props.reset()} textValue={t('Try again')} />
    </LayoutSection>
  )
}
