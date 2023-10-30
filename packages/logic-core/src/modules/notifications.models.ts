export interface Notification {
  id: string
  message: string
  title: string
}

interface NotificationData {
  id: string
  message: string
  title: string
}

export class ModelNotification {
  deserialize = (notification: NotificationData): Notification => {
    return {
      id: notification.id,
      message: notification.message,
      title: notification.title,
    }
  }

  toId = (notification: Notification) => {
    return notification.id
  }

  toString = (notification: Notification) => {
    return notification.message
  }

  toTitle = (notification: Notification) => {
    return notification.title
  }

  toToast = (notification: Notification) => {
    return {
      description: this.toString(notification),
      isClosable: true,
      status: 'info' as const,
      title: this.toTitle(notification),
    }
  }
}
