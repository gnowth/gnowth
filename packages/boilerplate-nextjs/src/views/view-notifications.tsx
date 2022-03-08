import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function ViewNotifications() {
  const { t } = useTranslation()

  return <Text>{t('Notifications')}</Text>
}

export default ViewNotifications
