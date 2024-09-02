import { UITypography } from '@gnowth/lib-react'
import { useTranslation } from 'react-i18next'

export function ViewNotifications() {
  const { t } = useTranslation('other')

  return <UITypography value={t('Notifications')} />
}
