import { UITypography, useTranslation } from '@gnowth/lib-react'

export function ViewNotifications() {
  const { t } = useTranslation('other')

  return <UITypography value={t('Notifications')} />
}
