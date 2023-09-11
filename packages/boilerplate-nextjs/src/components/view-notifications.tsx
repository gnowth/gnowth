import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export function ViewNotifications() {
  const { t } = useTranslation('other')

  return <Text>{t('Notifications')}</Text>
}
