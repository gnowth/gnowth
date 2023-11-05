import { useToast } from '@chakra-ui/react'
import { useStream } from '@gnowth/lib-react'

import { dependencies } from '../dependencies'

export function SystemNotifications() {
  const toast = useToast({ position: 'bottom-right' })

  // DEBT(investigation): watch notification channels and push to toast or in setup?
  useStream(dependencies.notificationStream.stream, toast)

  return null
}
