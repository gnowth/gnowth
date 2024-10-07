import { useToast } from '@chakra-ui/react'
import { NotificationStream, PlatformDependency, usePlatformProvider, useStream } from '@gnowth/lib-react'

export function SystemNotifications() {
  const toast = useToast({ position: 'bottom-right' })
  const notificationStreamState = usePlatformProvider<NotificationStream>({
    name: PlatformDependency.notificationStream,
  })

  // DEBT(investigation): watch notification channels and push to toast or in setup?
  useStream(notificationStreamState.value?.stream, toast)

  return null
}
