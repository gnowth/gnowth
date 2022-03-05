export interface Notification {
  id: string
  message: string
  title: string
}

interface NotificationSerialized {
  id: string
  message: string
  title: string
}

class ModelNotification {
  static deserialize = (notification: NotificationSerialized): Notification => {
    return {
      id: notification.id,
      message: notification.message,
      title: notification.title,
    }
  }

  static toId = (notification: Notification) => {
    return notification.id
  }

  static toString = (notification: Notification) => {
    return notification.message
  }

  static toTitle = (notification: Notification) => {
    return notification.title
  }

  static toToast = (notification: Notification) => {
    return {
      description: ModelNotification.toString(notification),
      isClosable: true,
      status: 'info' as const,
      title: ModelNotification.toTitle(notification),
    }
  }
}

export default ModelNotification
