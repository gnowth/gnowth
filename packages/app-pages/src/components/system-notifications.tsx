import { NotificationStream, PlatformDependency, usePlatformProvider, useStream } from '@gnowth/lib-react'
import { toast, ToastContainer } from 'react-toastify'

export function SystemNotifications() {
  const notificationStreamState = usePlatformProvider<NotificationStream>({
    name: PlatformDependency.notificationStream,
  })

  // DEBT(investigation): watch notification channels and push to toast or in setup?
  useStream(notificationStreamState.value?.stream, (incomingToast) =>
    toast(incomingToast.message, incomingToast),
  )

  return <ToastContainer limit={5} position="bottom-right" stacked />
}
